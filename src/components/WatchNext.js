import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const WatchNext = ({ user, logoutUser, apiUrl, userSeriesList, getUserSeriesList }) => {
    const [filteredUserSeriesList, setFilteredUserSeriesList] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        (async () => {
            setFilteredUserSeriesList(
                userSeriesList.filter(userSeries => userSeries.watchingStatus === 'Watch next')
            );
            setIsLoaded(true);
        })();
    }, [userSeriesList])
    
    if (!isLoaded)return <div className="loading">Loading...</div>;

    return (
        <section id="series-watch-next">
            <h1>Series you want to watch next</h1>
            <ul className="series-list">
                {filteredUserSeriesList.map(userSeries => (
                    <li key={userSeries._id}>
                        {userSeries.series_id}
                    </li>
                ))}
            </ul>
            {filteredUserSeriesList.length === 0 &&
                <p>You have nothing to watch next. <Link to='/add-series'>Add a series</Link>!</p>
            }
        </section>
    );
}

export default WatchNext;