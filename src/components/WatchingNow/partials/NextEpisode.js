import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const NextEpisode = ({ user, logoutUser, apiUrl, seriesId, episodeId }) => {
    const [episode, setEpisode] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                const response = await fetch(`${apiUrl}/series/${seriesId}/get-episode/${episodeId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.token}`
                    }
                });
    
                if ([401, 403].includes(response.status)) {
                    logoutUser();
                } else {
                    const episode = await response.json();
    
                    if (!response.ok) {
                        throw new Error(response.statusText);
                    }
    
                    setEpisode(episode);
                    setError(null);
                }
            } catch (err) {
                setError('Something went wrong when getting episodes. Reload page and try again.');
            }
        })();
    }, [])

    if (error) {
        const message = document.querySelector('.message');
        message.classList.add('error', 'is-active');
        message.innerHTML = error;
    }
    
    return (
        <article className="next-episode">
            <h3><Link to={'/series/' + seriesId}>{episode.series}</Link></h3>
            <h4>{episode.episodeNumbers} {episode.name}</h4>
        </article>
    );
}

export default NextEpisode;