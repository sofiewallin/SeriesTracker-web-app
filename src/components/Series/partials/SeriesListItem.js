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
        let isMounted = true;
        switch (watchingStatus) {
            case 'Watching now':
                if (isMounted) {
                    setAction('Finish watching');
                    setValue('have-watched');
                }
                break;
            case 'Watch next':
                if (isMounted) {
                    setAction('Start watching');
                    setValue('watching-now');
                }
                break;
            case 'Have watched':
                if (isMounted) {
                    setAction('Watch again');
                    setValue('watching-now');
                }
                break;
        }
        return () => { isMounted = false };
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
        <article id={`series-${series._id}`} className='series-list-item'>
            <Link to={'/series/' + series._id} className='box box-link'>
                <h3 className='heading heading-list-item'>{series.name}</h3>
            </Link>
            <button className='button button-small' value={value} onClick={handleClick}>{action}</button>
            {isClearingWatchHistory && (
                <ClearingWatchHistory
                    series={series}
                    newWatchingStatus='watching-now'
                    changeWatchingStatus={changeWatchingStatus}
                    clearWatchHistory={clearWatchHistory}
                    setIsClearingWatchHistory={setIsClearingWatchHistory}
                />
            )}
        </article>
    );
}

// Export component
export default SeriesListItem;
