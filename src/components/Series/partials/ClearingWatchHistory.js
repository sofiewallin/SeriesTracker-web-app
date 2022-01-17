import React from 'react';

const ClearingWatchHistory = ({ series, changeWatchingStatus, clearWatchHistory, setIsClearingWatchHistory }) => {
    const handleClick = async e => {
        e.preventDefault();
        const answer = e.target.value;
        if (answer === 'Yes') await clearWatchHistory();
        setIsClearingWatchHistory(false);
        await changeWatchingStatus('watching-now');
    }

    return (
        <div className="clear-watch-history-prompt" aria-live="polite">
            <h3>Do you want to clear the watch history before you watch {series.name} again?</h3>
            <p>All the episodes will be unchecked and you can start over.</p>
            <button className="button" value='Yes' onClick={handleClick}>Yes</button>
            <button className="button" value='No' onClick={handleClick}>No</button>
        </div>
    );
}

export default ClearingWatchHistory;