/**
 * Series component.
 * 
 * Fetches one series based on id from the API and handles
 * update functions on the series when it is added to the
 * user. Passes on series to other components for different
 * user actions.
 * 
 * Renders Series Details view and passes series on to another
 * component for rendering of a series list item.
 * 
 * @author: Sofie Wallin
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import SeriesListItem from './partials/SeriesListItem';
import AddingSeries from './partials/AddingSeries';
import RemovingSeries from './partials/RemovingSeries';
import MovingSeries from './partials/MovingSeries';

const Series = ({ user, logoutUser, apiUrl, userSeries, seriesId, isListItem, getUserSeriesList, addUserSeries, removeUserSeries }) => {
    const [series, setSeries] = useState(null);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    const [isAddingSeries, setIsAddingSeries] = useState(false);
    const [isRemovingSeries, setIsRemovingSeries] = useState(false);
    const [isMovingSeries, setIsMovingSeries] = useState(false)

    const navigate = useNavigate();

    // Update watching status of series added to user in the API
    const changeWatchingStatus = async watchingStatus => {
        try {
            const response = await fetch(`${apiUrl}/users/${user.userId}/series/${userSeries._id}/change-watching-status/${watchingStatus}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            }); 

            // Logout user if token has expired
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
            // Get and set the list of series added to the user with function in the App component
            await getUserSeriesList();
        }
    }

    // Empty the list of watched episodes of series added to user in API
    const clearWatchHistory = async () => {
        try {
            const response = await fetch(`${apiUrl}/users/${user.userId}/series/${userSeries._id}/clear-watch-history`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            });

            // Logout user if token has expired
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
            // Get and set the list of series added to the user with function in the App component
            await getUserSeriesList();
        }
    }

    // Add an episode to watched episodes in series added to user in API
    const watchEpisode = async episodeId => {
        try {
            const response = await fetch(`${apiUrl}/users/${user.userId}/series/${userSeries._id}/watch-episode/${episodeId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            });
            
            // Logout user if token has expired
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
            // Get and set the list of series added to the user with function in the App component
            await getUserSeriesList();
        }
    }

    // Remove an episode from watched episodes in series added to user in API
    const unwatchEpisode = async episodeId => {
        try {
            const response = await fetch(`${apiUrl}/users/${user.userId}/series/${userSeries._id}/unwatch-episode/${episodeId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            });

            // Logout user if token has expired
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
            // Get and set the list of series added to the user with function in the App component
            await getUserSeriesList();
        }
    }

    // Handle click on "Add Series"-button
    const handleAdd = async e => {
        e.preventDefault();
        setIsAddingSeries(true);
    }

    // Handle click on "Remove Series"-button
    const handleRemove = async e => {
        e.preventDefault();
        setIsRemovingSeries(true);
    }

    // Handle click on "Move series"-button
    const handleMove = async e => {
        e.preventDefault();
        setIsMovingSeries(true);
    }

    // Handle click on button that toggles episodes in a season
    const toggleEpisodes = e => {
        e.preventDefault();

        const button = e.target;
        const episodeList = button.nextElementSibling;

        episodeList.classList.toggle('hidden');
        button.classList.toggle('button-hide');
        button.classList.toggle('button-show');

        if ( button.getAttribute( 'aria-expanded') === 'false' ) {
            button.setAttribute( 'aria-expanded', 'true' );
        } else {
            button.setAttribute( 'aria-expanded', 'false' );
        }
        
        if (button.innerHTML === "<span class='hidden-visually'>Show episodes</span>") {
            button.innerHTML = "<span class='hidden-visually'>Hide episodes</span>";
        } else {
            button.innerHTML = "<span class='hidden-visually'>Show episodes</span>";
        }
    }

    // Handle click on "Watch episode"-button on one episode
    const handleWatchEpisode = async e => {
        e.preventDefault();
        const episodeId = e.target.value;
        await watchEpisode(episodeId);
    }

    // Handle click on "Unwatch episode"-button on one episode
    const handleUnwatchEpisode = async e => {
        e.preventDefault();
        const episodeId = e.target.value;
        await unwatchEpisode(episodeId);
    }

    // Get a series based on id from the API
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
                
                // Logout user if token has expired
                if ([401, 403].includes(response.status)) {
                    logoutUser();
                } else {
                    const series = await response.json();
    
                    if (!response.ok) {
                        throw new Error(response.statusText);
                    }
                    
                    // Set series to state
                    setSeries(series);

                    setError(null);
                }
            } catch (err) {
                setError('Something went wrong when getting a series. Reload page and try again.');
            } finally {
                setIsLoaded(true);
            }
            
        })();
    }, [])
    
    // Show error if there is one
    if (error) {
        const message = document.querySelector('.message');
        message.classList.add('error', 'is-active');
        message.innerHTML = error;
    }

    // Show loading message until series is fetched from the API
    if (!isLoaded)return <div className="loading">Loading...</div>;

    // Return series list item through another component
    if (isListItem) return (
        <SeriesListItem 
            watchingStatus={userSeries.watchingStatus} 
            series={series} 
            changeWatchingStatus={changeWatchingStatus}
            clearWatchHistory={clearWatchHistory}
        />
    );
    
    // Return component in Series Details view.
    return (
        <>
            <button onClick={() => navigate(-1)} className='go-back-link'>Go back</button>
            <article id={`series-${series._id}`} className='series-details'>
                <div className='clear'>
                    <div className='general-information'>
                        <h1 className='heading heading-big'>{series.name}</h1>
                        {series.airingStatus !== 'Airing' && (
                            <p className='airing-status'>{series.airingStatus}</p>
                        )}
                        <p className='plot big-text'>{series.plot}</p>
                    </div>
                    <div className='actions'>
                        {!userSeries && (
                            <>
                                <button className='button button-add' onClick={handleAdd}>Add Series</button>
                                {isAddingSeries && (
                                    <AddingSeries
                                        series={series}
                                        addUserSeries={addUserSeries}
                                        setIsAddingSeries={setIsAddingSeries}
                                    />
                                )}
                            </>
                        )}
                        {userSeries && (
                            <>
                                <button className='button button-remove' onClick={handleRemove}>Remove Series</button>
                                {isRemovingSeries && (
                                    <RemovingSeries 
                                        series={series} 
                                        userSeriesId={userSeries._id} 
                                        removeUserSeries={removeUserSeries} 
                                        setIsRemovingSeries={setIsRemovingSeries} 
                                    />
                                )}
                                <button className='button button-move' onClick={handleMove}>Move Series</button>
                                {isMovingSeries && (
                                    <MovingSeries 
                                        series={series} 
                                        watchingStatus={userSeries.watchingStatus}
                                        changeWatchingStatus={changeWatchingStatus}
                                        clearWatchHistory={clearWatchHistory}
                                        setIsMovingSeries={setIsMovingSeries}
                                    />
                                )}
                            </>
                        )}
                    </div>
                </div>
                <h2 className='heading heading-medium'>Seasons</h2>
                <ul className='season-list'>
                    {series.seasons.map(season => (
                        <li key={season.number} className='season box'>
                            <section>
                                <h3 className='heading heading-list-item'>Season {season.number}</h3>
                                <button className='button-show' aria-controls={`episode-list-season-${season.number}`} aria-expanded='false' onClick={toggleEpisodes}>
                                    <span className='hidden-visually'>Show episodes</span>
                                </button>
                                <ul id={`episode-list-season-${season.number}`} className='episode-list hidden'>
                                    {season.episodes.map(episode => (
                                        <li key={episode.episodeId} className='episode'>
                                            <article id={`episode-${episode.episodeId}`}>
                                                <h4>{episode.name}</h4>
                                                {episode.originalAirDate && (
                                                    <p>{episode.episodeNumbers} - {episode.originalAirDate}</p>
                                                )}
                                                {!episode.originalAirDate && (
                                                    <p>{episode.episodeNumbers} - ?</p>
                                                )}
                                                {userSeries && userSeries.watchedEpisodes.includes(episode.episodeId) && (
                                                    <button className='button-unwatch' value={episode.episodeId} onClick={handleUnwatchEpisode}>
                                                        <span className='hidden-visually'>Unwatch episode</span>
                                                    </button>
                                                )}
                                                {userSeries && !userSeries.watchedEpisodes.includes(episode.episodeId) && (
                                                    <button className='button-watch' value={episode.episodeId} onClick={handleWatchEpisode}>
                                                        <span className='hidden-visually'>Watch episode</span>
                                                    </button>
                                                )}
                                            </article>
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        </li>
                    ))}
                </ul>
            </article>
        </>
    );
}

// Export component
export default Series;
