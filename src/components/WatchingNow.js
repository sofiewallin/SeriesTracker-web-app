import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Episode from './Episode';
import logoutUser from './Login/logoutUser';
import SeriesList from './SeriesList';

const WatchingNow = ({ token, userId }) => {
    const [nextEpisodeList, setNextEpisodeList] = useState([]);

    useEffect(() => {
        const getEpisodes = async () => {
            const fetchedNextEpisodeList = await fetchNextEpisodeList();
            setNextEpisodeList(fetchedNextEpisodeList);
        }

        getEpisodes();
    }, []);

    const fetchNextEpisodeList = async () => {
        const response = await fetch(`https://dt162g-projekt-api.herokuapp.com/users/${userId}/next-episode-list`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    
        const result = await response.json();

        if (response.status === 401 || response.status === 403) {
            logoutUser();
        }

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        return result;
    }

    return (
        <>
            <section id="next-episode">
                <h2>Next episode to watch</h2>
                <ul className="episodes">
                {nextEpisodeList.map((episode) => (
                    <li key={episode.nextEpisode}>
                        <Episode token={token} nextEpisode={episode} />
                    </li>
                ))}
                {nextEpisodeList.length === 0 &&
                    <li>You're up to date with all your series! Maybe you should <Link to='/watch-next'>start watching</Link> a new one.</li>
                }
                </ul>
            </section>
            <SeriesList 
                token={token} 
                userId={userId}
                title='Series you are watching right now' 
                watchingStatus='watching-now' 
                nextEpisodeList={nextEpisodeList}
                setNextEpisodeList={setNextEpisodeList}
            />
        </>
    );
}

export default WatchingNow;