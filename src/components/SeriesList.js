import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import SeriesListItem from './SeriesListItem';

const SeriesList = ({ token, userId, title, watchingStatus, nextEpisodeList, setNextEpisodeList }) => {
    const [seriesList, setSeriesList] = useState([]);

    useEffect(() => {
        const getSeriesList = async () => {
            const fetchedSeriesList = await fetchSeriesList();
            setSeriesList(fetchedSeriesList);
        }

        getSeriesList();
    }, []);

    const fetchSeriesList = async () => {
        const response = await fetch(`https://dt162g-projekt-api.herokuapp.com/users/${userId}/series/watching-status/${watchingStatus}`, {
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

    let emptyListMessage;
    let linkPath;
    let linkText;
    switch(watchingStatus) {
        case 'watching-now':
            emptyListMessage = 'You have not added anything to watch right now.';
            linkPath = '/watch-next';
            linkText = 'Start watching something';
            break;
        case 'watch-next':
            emptyListMessage = 'You have nothing to watch next.';
            linkPath = '/add-series';
            linkText = 'Add a series';
            break;
        case 'have-watched':
            emptyListMessage = 'You have not finished watching any series yet.';
            linkPath = '/';
            linkText = 'Get to watching'
    }

    return (
        <section id="series-list">
            <h1>{ title }</h1>
            <ul className="series">
            {seriesList.map((series) => (
                <li key={series._id}>
                    <SeriesListItem 
                        token={token} 
                        userId={userId} 
                        userSeries={series} 
                        watchingStatus={watchingStatus} 
                        seriesList={seriesList} 
                        setSeriesList={setSeriesList}
                        nextEpisodeList={nextEpisodeList}
                        setNextEpisodeList={setNextEpisodeList} 
                    />
                </li>
            ))}
            {seriesList.length === 0 &&
                <li>{emptyListMessage} <Link to={linkPath}>{linkText}</Link>!</li>
            }
            </ul>
        </section>
    );
}

export default SeriesList;