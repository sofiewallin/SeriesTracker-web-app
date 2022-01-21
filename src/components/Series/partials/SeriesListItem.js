/**
 * Series List Item component.
 * 
 * Renders series list item in all lists except the 
 * "searched series list". Handles user action to change 
 * watching status with functions from the Series 
 * component.
 * 
 * @author: Sofie Wallin
 */

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import ClearingWatchHistory from './ClearingWatchHistory';

const SeriesListItem = ({ watchingStatus, series, changeWatchingStatus, clearWatchHistory }) => {
    const [action, setAction] = useState(null);
    const [value, setValue] = useState(null);
    const [isClearingWatchHistory, setIsClearingWatchHistory] = useState(false);

    // Set different actions based on watching status
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

    // Handle click on button on series list item
    const handleClick = async e => {
        e.preventDefault();
        const watchingStatusParameter = e.target.value;
        
        /* Render Clearing Watch History component if the watching 
        status is "Have Watched" or change watching status with
        function from Series component if not. */
        if (watchingStatus === 'Have watched') {
            setIsClearingWatchHistory(true);
        } else {
            await changeWatchingStatus(watchingStatusParameter);
        }
    }

    // Return component
    return (
        <Link to={'/series/' + series._id} className='box box-link'>
            <article id={`series-${series._id}`} className='series-list-item clear'>
                <h3 className='heading heading-list-item'>{series.name}</h3>
                <button className='button button-small' value={value} onClick={handleClick}>{action}</button>
                {isClearingWatchHistory && (
                    <ClearingWatchHistory
                        series={series}
                        changeWatchingStatus={changeWatchingStatus}
                        clearWatchHistory={clearWatchHistory}
                        setIsClearingWatchHistory={setIsClearingWatchHistory}
                    />
                )}
            </article>
            </Link>
    );
}

// Export component
export default SeriesListItem;
