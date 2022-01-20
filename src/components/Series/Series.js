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
        try {
            const response = await fetch(`${apiUrl}/users/${user.userId}/series/${userSeries._id}/watch-episode/${episodeId}`, {
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

    const unwatchEpisode = async episodeId => {
        try {
            const response = await fetch(`${apiUrl}/users/${user.userId}/series/${userSeries._id}/unwatch-episode/${episodeId}`, {
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

    const handleAdd = async e => {
        e.preventDefault();
        setIsAddingSeries(true);
    }

    const handleRemove = async e => {
        e.preventDefault();
        setIsRemovingSeries(true);
    }

    const handleMove = async e => {
        e.preventDefault();
        setIsMovingSeries(true);
    }

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

    const handleWatchEpisode = async e => {
        e.preventDefault();
        const episodeId = e.target.value;
        await watchEpisode(episodeId);
    }

    const handleUnwatchEpisode = async e => {
        e.preventDefault();
        const episodeId = e.target.value;
        await unwatchEpisode(episodeId);
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
        <>
        <button onClick={() => navigate(-1)} className='go-back-link'>Go back</button>
        <article id={`series-${series._id}`} className="series-details">
            <div className='clear'>
                <div className='general-information'>
                    <h1 className='heading heading-big'>{series.name}</h1>
                    {series.airingStatus !== 'Airing' && (
                        <p className="airing-status">{series.airingStatus}</p>
                    )}
                    <p className='plot big-text'>{series.plot}</p>
                </div>
                <div className="actions">
                    {!userSeries && (
                        <>
                            <button className="button button-add" onClick={handleAdd}>Add Series</button>
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
                            <button className="button button-remove" onClick={handleRemove}>Remove Series</button>
                            {isRemovingSeries && (
                                <RemovingSeries 
                                    series={series} 
                                    userSeriesId={userSeries._id} 
                                    removeUserSeries={removeUserSeries} 
                                    setIsRemovingSeries={setIsRemovingSeries} 
                                />
                            )}
                            <button className="button button-move" onClick={handleMove}>Move Series</button>
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
            <ul className="season-list">
                {series.seasons.map(season => (
                    <li key={season.number} className='season box'>
                        <section>
                            <h3 className='heading heading-list-item'>Season {season.number}</h3>
                            <button className="button-show" aria-controls={`episode-list-season-${season.number}`} aria-expanded="false" onClick={toggleEpisodes}>
                                <span className='hidden-visually'>Show episodes</span>
                            </button>
                            <ul id={`episode-list-season-${season.number}`} className="episode-list hidden">
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

export default Series;
