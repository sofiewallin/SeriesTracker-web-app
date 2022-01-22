/**
 * Watching Now component.
 * 
 * Entry for the Watching Now route: /.
 * 
 * Handles filtering of series added to user based
 * on watching status and passes on each series in
 * the list to the Next Episode component and the
 * Series component.
 * 
 * @author: Sofie Wallin
 */

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import NextEpisode from './partials/NextEpisode';
import Series from '../Series/Series';

const WatchingNow = ({ user, logoutUser, apiUrl, userSeriesList, getUserSeriesList }) => {
    const [filteredUserSeriesList, setFilteredUserSeriesList] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Filter list of series added to user based on watching status
    useEffect(() => {
        (async () => {
            setFilteredUserSeriesList(
                userSeriesList.filter(userSeries => userSeries.watchingStatus === 'Watching now')
            );
            setIsLoaded(true);
        })();
    }, [userSeriesList]) // Run again if list of series added to user changes
    
    // Show loading message until API search is complete
    if (!isLoaded)return <div className='loading'>Loading...</div>;

    // Return component
    return (
        <>
            <header>
                <h1 className='heading heading-big'>What are you watching today?</h1>
            </header>
         <section id='next-episode'>
            <h2 className='heading heading-medium'>Next episode</h2>
            <ul className='next-episode-list'>
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
                <p>You're up to date with all your series! Maybe you should <Link to='/watch-next' className='highlighted-link'>start watching a new one</Link>.</p>
            }
            </section>
            <section id='series-watching-now'>
                <h2 className='heading heading-medium'>Series you're watching right now</h2>
                <ul className='series-list'>
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
                    <p>You have not added anything to watch right now. <Link to='/watch-next' className='highlighted-link'>Start watching a series</Link>!</p>
                }
            </section>
        </>
    );
}

// Export component
export default WatchingNow;
