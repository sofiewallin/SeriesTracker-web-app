import React, { useEffect } from 'react';

const ClearingWatchHistory = ({ series, changeWatchingStatus, clearWatchHistory, setIsClearingWatchHistory, setIsMovingSeries }) => {
    
    useEffect(() => {
        if (setIsMovingSeries) {
            const changeWatchingStatusPrompt = document.querySelector('.changing-watching-status-prompt-wrapper');
            changeWatchingStatusPrompt.classList.add('hidden-visually');
        }
    }, [])

    const handleClick = async e => {
        e.preventDefault();
        const answer = e.target.value;
        if (answer === 'Yes') await clearWatchHistory();
        await changeWatchingStatus('watching-now');
        setIsClearingWatchHistory(false);
        if (setIsMovingSeries) setIsMovingSeries(false);
    }

    const closePrompt = e => {
        e.preventDefault();
        setIsClearingWatchHistory(false);
        setIsMovingSeries(false);
        return;
    }

    return (
        <div className='prompt-wrapper'>
            <div className="prompt centered" aria-live="polite">
                <h3 className='heading'>Do you want to clear the watch history before you watch {series.name} again?</h3>
                <p>All the episodes will be unchecked and you can start over.</p>
                <div className='clear'>
                    <button className="button button-small button-50" value='Yes' onClick={handleClick}>Yes</button>
                    <button className="button button-small button-50" value='No' onClick={handleClick}>No</button>
                </div>
                <button className='button-close' onClick={closePrompt}><span className='hidden-visually'>Close</span></button>
            </div>
        </div>
    );
}

export default ClearingWatchHistory;