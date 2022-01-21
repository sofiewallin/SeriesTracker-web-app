/**
 * Next Episode component.
 * 
 * Handles an episode coming from Watching Now. Gets the
 * episode from the API by id and returns it as a component.
 * 
 * @author: Sofie Wallin
 */

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const NextEpisode = ({ user, logoutUser, apiUrl, seriesId, episodeId }) => {
    const [episode, setEpisode] = useState([]);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    // Get episode by id from API
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
                
                // Logout user if token has expired
                if ([401, 403].includes(response.status)) {
                    logoutUser();
                } else {
                    const episode = await response.json();
    
                    if (!response.ok) {
                        throw new Error(response.statusText);
                    }
                    
                    // Set episode to state
                    setEpisode(episode);

                    setError(null);
                }
            } catch (err) {
                setError('Something went wrong when getting episodes. Reload page and try again.');
            } finally {
                setIsLoaded(true);
            }
        })();
    }, [])

    // Show error if there is one
    if (error) {
        const message = document.querySelector('.message');
        message.classList.add('error', 'is-active');
        message.innerHTML = error;
    }

    // Show loading message until episode is fetched from the API
    if (!isLoaded)return <div className='loading'>Loading...</div>;
    
    // Return component
    return (
        <Link to={'/series/' + seriesId} className='box box-link'>
            <article className='next-episode'>
                <h3 className='heading heading-list-item'>{episode.series}</h3>
                <h4 className='heading heading-light'>{episode.episodeNumbers} - {episode.name}</h4>
            </article>
        </Link>
    );
}

// Export component
export default NextEpisode;
