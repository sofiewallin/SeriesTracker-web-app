/**
 * Watch Next component.
 * 
 * Entry for the Watch Next route: /watch-next.
 * 
 * Handles filtering of series added to user based
 * on watching status and passes on each series in
 * the list to the Series component.
 * 
 * @author: Sofie Wallin
 */

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Series from './Series/Series';

const WatchNext = ({ user, logoutUser, apiUrl, userSeriesList, getUserSeriesList }) => {
    const [filteredUserSeriesList, setFilteredUserSeriesList] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Filter list of series added to user based on watching status
    useEffect(() => {
        (async () => {
            setFilteredUserSeriesList(
                userSeriesList.filter(userSeries => userSeries.watchingStatus === 'Watch next')
            );
            setIsLoaded(true);
        })();
    }, [userSeriesList]) // Run again if list of series added to user changes
    
    // Show loading message until API search is complete
    if (!isLoaded)return <div className='loading'>Loading...</div>;

    // Return component
    return (
        <section id='series-watch-next'>
            <h1 className='heading heading-big'>Watchlist</h1>
            <h2 className='headin heading-medium'>Series you want to watch next</h2>
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
                <p>You have nothing to watch next. <Link to='/add-series' className='highlighted-link'>Add a series</Link>!</p>
            }
        </section>
    );
}

// Export component
export default WatchNext;
