import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import NextEpisode from './partials/NextEpisode';
import Series from '../Series/Series';

const WatchingNow = ({ user, logoutUser, apiUrl, userSeriesList, getUserSeriesList }) => {
    const [filteredUserSeriesList, setFilteredUserSeriesList] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        (async () => {
            setFilteredUserSeriesList(
                userSeriesList.filter(userSeries => userSeries.watchingStatus === 'Watching now')
            );
            setIsLoaded(true);
        })();
    }, [userSeriesList])
    
    if (!isLoaded)return <div className="loading">Loading...</div>;

    return (
        <>
            <header>
                <h1 className='heading heading-big'>What are you watching today?</h1>
            </header>
         <section id="next-episode">
            <h2 className='heading heading-medium'>Next episode to watch</h2>
            <ul className="next-episode-list">
                {filteredUserSeriesList.map(userSeries => 
                    userSeries.nextEpisode && (
                        <li key={userSeries.nextEpisode}>
                            <NextEpisode 
                                user={user} 
                                logoutUser={logoutUser} 
                                apiUrl={apiUrl}
                                seriesId={userSeries.series_id} 
                                episodeId={userSeries.nextEpisode}
                            />
                        </li>
                    )
                )}
            </ul>
            {filteredUserSeriesList.every(userSeries => userSeries.nextEpisode === null) &&
                <p className='big-text'>You're up to date with all your series! Maybe you should <Link to='/watch-next' className='highlighted-link'>start watching a new one</Link>.</p>
            }
            </section>
            <section id="series-watching-now">
                <h2 className='heading heading-medium'>Your current series</h2>
                <ul className="series-list">
                    {filteredUserSeriesList.map(userSeries => (
                        <li key={userSeries._id}>
                            <Series 
                                user={user} 
                                logoutUser={logoutUser} 
                                apiUrl={apiUrl} 
                                userSeries={userSeries} 
                                seriesId={userSeries.series_id} 
                                isListItem={true}
                                getUserSeriesList={getUserSeriesList}
                            />
                        </li>
                    ))}
                </ul>
                {filteredUserSeriesList.length === 0 &&
                    <p className='big-text'>You have not added anything to watch right now. <Link to='/watch-next' className='highlighted-link'>Start watching a series</Link>!</p>
                }
            </section>
        </>
    );
}

export default WatchingNow;