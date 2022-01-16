import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

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
            <h1>Series you have watched</h1>
            <ul className="series-list">
                {filteredUserSeriesList.map(userSeries => (
                    <li key={userSeries._id}>
                        {userSeries.series_id}
                    </li>
                ))}
            </ul>
            {filteredUserSeriesList.length === 0 &&
                <p>You have not finished watching any series yet. <Link to='/'>Get to it</Link>!</p>
            }
        </section>
    );
}

export default HaveWatched;