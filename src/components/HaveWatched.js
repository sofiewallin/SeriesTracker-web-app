import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const HaveWatched = ({ user, logoutUser, apiUrl, seriesList, getSeriesList }) => {
    const [filteredSeriesList, setFilteredSeriesList] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        (async () => {
            setFilteredSeriesList(
                seriesList.filter((series) => series.watchingStatus === 'Have watched')
            );
            setIsLoaded(true);
        })();
    }, [seriesList])
    
    if (!isLoaded)return <div className="loading">Loading...</div>;

    return (
        <section id="series-watch-next">
            <h1>Series you have watched</h1>
            <ul className="series-list">
                {filteredSeriesList.map((series) => (
                    <li key={series._id}>
                        {series.series_id}
                    </li>
                ))}
            </ul>
            {filteredSeriesList.length === 0 &&
                <p>You have not finished watching any series yet. <Link to='/'>Get to it</Link>!</p>
            }
        </section>
    );
}

export default HaveWatched;