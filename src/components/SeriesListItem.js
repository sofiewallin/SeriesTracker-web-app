import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import clearWatchHistory from './Series/clearWatchHistory';

const SeriesListItem = ({ 
        token, 
        userId, 
        userSeries, 
        watchingStatus, 
        seriesList, 
        setSeriesList, 
        nextEpisodeList,
        setNextEpisodeList
    }) => {

    const seriesId = userSeries.series_id;
    const userSeriesId = userSeries._id;

    const [series, setSeries] = useState([]);

    useEffect(() => {
        const getSeries = async () => {
            const fetchedSeries = await fetchSeries();
            setSeries(fetchedSeries);
        }

        getSeries();
    }, []);

    const fetchSeries = async () => {
        const response = await fetch(`https://dt162g-projekt-api.herokuapp.com/series/${seriesId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    
        const result = await response.json();

        if (response.status === 401 || response.status === 403) {
            logoutUser();
        }

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        return result;
    }

    let buttonText;
    let newStatus;
    switch(watchingStatus) {
        case 'watching-now':
            buttonText = 'Finish watching';
            newStatus = 'have-watched';
            break;
        case 'watch-next':
            buttonText = 'Start watching';
            newStatus = 'watching-now';
            break;
        case 'have-watched':
            buttonText = 'Watch again';
            newStatus = 'watching-now';
            break;
    }

    const handleClick = async e => {
        e.preventDefault();

        if (watchingStatus === 'have-watched') {
            if (confirm(`Do you want to clear the watch history before you watch this series again?`)) {
                await clearWatchHistory(userId, userSeriesId, token);
            }
        }

        await changeWatchingStatus();
    }

    const changeWatchingStatus = async () => {
        const response = await fetch(`https://dt162g-projekt-api.herokuapp.com/users/${userId}/series/${userSeriesId}/change-watching-status/${newStatus}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    
        const result = await response.json();

        if (response.status === 401 || response.status === 403) {
            logoutUser();
        }

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        if (watchingStatus === 'watching-now') {
            setNextEpisodeList(nextEpisodeList.filter((episode) => episode.series !== seriesId));
        }

        setSeriesList(seriesList.filter((seriesListItem) => seriesListItem.series_id !== seriesId));
    }

    return (
        <article className="series">
            <h2><Link to={'/series/' + seriesId}>{series.name}</Link></h2>
            <button onClick={handleClick}>{buttonText}</button>
        </article>
    );
}

export default SeriesListItem;