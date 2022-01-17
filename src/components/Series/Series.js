import React, { useState, useEffect } from 'react';

import SeriesListItem from './partials/SeriesListItem';

const Series = ({ user, logoutUser, apiUrl, userSeries, seriesId, isListItem, getUserSeriesList, addUserSeries, removeUserSeries }) => {
    const [series, setSeries] = useState(null);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    const changeWatchingStatus = async watchingStatus => {
        try {
            const response = await fetch(`${apiUrl}/users/${user.userId}/series/${userSeries._id}/change-watching-status/${watchingStatus}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            });

            if ([401, 403].includes(response.status)) {
                logoutUser();
            } else {
                const updatedUserSeries = await response.json();

                if (!response.ok) {
                    throw new Error(response.statusText);
                }

                setError(null);
                return updatedUserSeries;
            }
        } catch (err) {
            setError('Something went wrong when updating series. Reload page and try again.');
        } finally {
            await getUserSeriesList();
        }
    }

    const clearWatchHistory = async () => {
        try {
            const response = await fetch(`${apiUrl}/users/${user.userId}/series/${userSeries._id}/clear-watch-history`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            });

            if ([401, 403].includes(response.status)) {
                logoutUser();
            } else {
                const updatedUserSeries = await response.json();

                if (!response.ok) {
                    throw new Error(response.statusText);
                }

                setError(null);
                return updatedUserSeries;
            }
        } catch (err) {
            setError('Something went wrong when updating series. Reload page and try again.');
        } finally {
            await getUserSeriesList();
        }
    }

    const watchEpisode = async episodeId => {

    }

    const unwatchEpisode = async episodeId => {
        
    }

    useEffect(() => {
        (async () => {
            try {
                const response = await fetch(`${apiUrl}/series/${seriesId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.token}`
                    }
                });
    
                if ([401, 403].includes(response.status)) {
                    logoutUser();
                } else {
                    const series = await response.json();
    
                    if (!response.ok) {
                        throw new Error(response.statusText);
                    }
    
                    setSeries(series);
                    setError(null);
                }
            } catch (err) {
                setError('Something went wrong when getting list of series. Reload page and try again.');
            } finally {
                setIsLoaded(true);
            }
        })();
    }, [])
    
    if (!isLoaded)return <div className="loading">Loading...</div>;

    if (error) {
        const message = document.querySelector('.message');
        message.classList.add('error', 'is-active');
        message.innerHTML = error;
    }

    if (isListItem) return (
        <SeriesListItem 
            watchingStatus={userSeries.watchingStatus} 
            series={series} 
            changeWatchingStatus={changeWatchingStatus}
            clearWatchHistory={clearWatchHistory}
        />
    );

    return (
        <article id={`series-${series._id}`} className="series">
            <h1>{series.name}</h1>
            <p><em>{series.airingStatus}</em></p>
            <p>{series.plot}</p>
        </article>
    );
}

export default Series;