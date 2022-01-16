import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const WatchNext = ({ user, logoutUser, apiUrl, seriesList, getSeriesList }) => {
    const [filteredSeriesList, setFilteredSeriesList] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        (async () => {
            setFilteredSeriesList(
                seriesList.filter((series) => series.watchingStatus === 'Watch next')
            );
            setIsLoaded(true);
        })();
    }, [seriesList])
    
    if (!isLoaded)return <div className="loading">Loading...</div>;

    return (
        <section id="series-watch-next">
            <h1>Series you want to watch next</h1>
            <ul className="series-list">
                {filteredSeriesList.map((series) => (
                    <li key={series._id}>
                        {series.series_id}
                    </li>
                ))}
            </ul>
            {filteredSeriesList.length === 0 &&
                <p>You have nothing to watch next. <Link to='/add-series'>Add a series</Link>!</p>
            }
        </section>
    );
}

export default WatchNext;