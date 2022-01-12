import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Episode = ({ token, nextEpisode }) => {
    const seriesId = nextEpisode.series;
    const episodeId = nextEpisode.nextEpisode;

    const [episode, setEpisode] = useState([]);

    useEffect(() => {
        const getEpisode = async () => {
            const fetchedEpisode = await fetchEpisode();
            setEpisode(fetchedEpisode);
        }

        getEpisode();
    }, []);

    const fetchEpisode = async () => {
        const response = await fetch(`https://dt162g-projekt-api.herokuapp.com/series/${seriesId}/get-episode/${episodeId}`, {
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
        <article className="next-episode">
            <h3><Link to={'/series/' + seriesId}>{episode.series}</Link></h3>
            <h4>{episode.episodeNumbers} {episode.name}</h4>
        </article>
    );
}

export default Episode;