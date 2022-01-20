import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Series from './Series/Series';

const HaveWatched = ({ user, logoutUser, apiUrl, userSeriesList, getUserSeriesList }) => {
    const [filteredUserSeriesList, setFilteredUserSeriesList] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        (async () => {
            setFilteredUserSeriesList(
                userSeriesList.filter(userSeries => userSeries.watchingStatus === 'Have watched')
            );
            setIsLoaded(true);
        })();
    }, [userSeriesList])
    
    if (!isLoaded)return <div className="loading">Loading...</div>;

    return (
        <section id="series-watch-next">
            <h1 className='heading heading-big'>Time to pick up an old favorite?</h1>
            <h2 className='heading heading-medium'>Your watch history</h2>
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
                <p className='big-text'>You have not finished watching any series yet. <Link to='/' className='highlighted-link'>Get to it</Link>!</p>
            }
        </section>
    );
}

export default HaveWatched;