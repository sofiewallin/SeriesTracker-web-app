import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import ClearingWatchHistory from './ClearingWatchHistory';

const SeriesListItem = ({ watchingStatus, series, changeWatchingStatus, clearWatchHistory }) => {
    const [action, setAction] = useState(null);
    const [value, setValue] = useState(null);
    const [isClearingWatchHistory, setIsClearingWatchHistory] = useState(false);

    useEffect(() => {
        switch (watchingStatus) {
            case 'Watching now':
                setAction('Finish watching');
                setValue('have-watched');
                break;
            case 'Watch next':
                setAction('Start watching');
                setValue('watching-now');
                break;
            case 'Have watched':
                setAction('Watch again');
                setValue('watching-now');
                break;
        }
    }, [])

    const handleClick = async e => {
        e.preventDefault();
        const watchingStatusParameter = e.target.value;
        
        if (watchingStatus === 'Have watched') {
            setIsClearingWatchHistory(true);
        } else {
            await changeWatchingStatus(watchingStatusParameter);
        }
    }

    return (
        <>
            <article id={`series-${series._id}`} className="series-list-item box">
                <h3><Link to={'/series/' + series._id}>{series.name}</Link></h3>
                <button className="button button-move" value={value} onClick={handleClick}>{action}</button>
                {isClearingWatchHistory && (
                    <ClearingWatchHistory
                        series={series}
                        changeWatchingStatus={changeWatchingStatus}
                        clearWatchHistory={clearWatchHistory}
                        setIsClearingWatchHistory={setIsClearingWatchHistory}
                    />
                )}
            </article>
        </>
    );
}

export default SeriesListItem;
