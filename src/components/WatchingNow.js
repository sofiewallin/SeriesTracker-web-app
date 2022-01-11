import React, { useEffect, useState } from 'react';

import logoutUser from './Login/logoutUser';
import Episode from './Episode';

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

        if (!response.ok) {
            if ([401, 403].includes(response.status)) {
                logoutUser();
            }
            throw new Error(response.statusText);
        }

        return result;
    }

    return (
        <section id="next-episode">
            <h2>Next episode to watch</h2>
            <ul className="episodes">
            {nextEpisodeList.length === 0 &&
                <li>You're up to date with all your series! Maybe you should start watching a new one :)</li>
            }
            {nextEpisodeList.map((episode) => (<li key={episode.nextEpisode}><Episode token={token} nextEpisode={episode} /></li>))}
            </ul>
        </section>
    );
}

export default WatchingNow;