import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const WatchingNow = ({ user, logoutUser, apiUrl, seriesList, getSeriesList }) => {
    const [filteredSeriesList, setFilteredSeriesList] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        (async () => {
            setFilteredSeriesList(
                seriesList.filter((series) => series.watchingStatus === 'Watching now')
            );
            setIsLoaded(true);
        })();
    }, [seriesList])
    
    if (!isLoaded)return <div className="loading">Loading...</div>;

    return (
        <>
         <section id="next-episode">
            <h2>Next episode to watch</h2>
            <ul className="episodes">
                {filteredSeriesList.map((series) => (
                    <li key={series.nextEpisode}>
                        {series.nextEpisode}
                    </li>
                ))}
            </ul>
            {filteredSeriesList.every(series => series.nextEpisode === null) &&
                <p>You're up to date with all your series! Maybe you should <Link to='/watch-next'>start watching a new one</Link>.</p>
            }
            </section>
            <section id="series-watching-now">
                <h1>Series you are watching right now</h1>
                <ul className="series-list">
                    {filteredSeriesList.map((series) => (
                        <li key={series._id}>
                            {series.series_id}
                        </li>
                    ))}
                </ul>
                {filteredSeriesList.length === 0 &&
                    <p>You have not added anything to watch right now. <Link to='/watch-next'>Start watching a series</Link>!</p>
                }
            </section>
        </>
    );
}

export default WatchingNow;