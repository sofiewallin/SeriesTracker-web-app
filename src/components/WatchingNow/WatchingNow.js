import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import NextEpisode from './partials/NextEpisode';

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
         <section id="next-episode">
            <h2>Next episode to watch</h2>
            <ul className="episodes">
                {filteredUserSeriesList.map(userSeries => (
                    <li key={userSeries.nextEpisode}>
                        <NextEpisode 
                            user={user} 
                            logoutUser={logoutUser} 
                            apiUrl={apiUrl}
                            seriesId={userSeries.series_id} 
                            episodeId={userSeries.nextEpisode}
                        />
                    </li>
                ))}
            </ul>
            {filteredUserSeriesList.every(userSeries => userSeries.nextEpisode === null) &&
                <p>You're up to date with all your series! Maybe you should <Link to='/watch-next'>start watching a new one</Link>.</p>
            }
            </section>
            <section id="series-watching-now">
                <h1>Series you are watching right now</h1>
                <ul className="series-list">
                    {filteredUserSeriesList.map((userSeries) => (
                        <li key={userSeries._id}>
                            {userSeries.series_id}
                        </li>
                    ))}
                </ul>
                {filteredUserSeriesList.length === 0 &&
                    <p>You have not added anything to watch right now. <Link to='/watch-next'>Start watching a series</Link>!</p>
                }
            </section>
        </>
    );
}

export default WatchingNow;