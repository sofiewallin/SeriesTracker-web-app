/**
 * Clearing Watch History component.
 * 
 * Handles prompt for clearing watch history when user
 * is moving series from "Have watched".
 * 
 * @author: Sofie Wallin
 */

import React, { useEffect } from 'react';

const ClearingWatchHistory = ({ series, changeWatchingStatus, clearWatchHistory, setIsClearingWatchHistory, setIsMovingSeries }) => {
    // Hide "Moving Series"- prompt if there is one when coming from Series Details view.
    useEffect(() => {
        if (setIsMovingSeries) {
            const changeWatchingStatusPrompt = document.querySelector('.changing-watching-status-prompt-wrapper');
            changeWatchingStatusPrompt.classList.add('hidden-visually');
        }
    }, [])

    // Handle click on Y/N-buttons
    const handleClick = async e => {
        e.preventDefault();
        const answer = e.target.value;

        // Clear watch history with function from Series component if answer is yes
        if (answer === 'Yes') await clearWatchHistory();

        // Change watching status with function from Series component
        await changeWatchingStatus('watching-now');

        // Close "Clearing Watch History"-prompt
        setIsClearingWatchHistory(false);

        // Close "Moving Series"-prompt if there is one
        if (setIsMovingSeries) setIsMovingSeries(false);
    }

    // Handle click on close button
    const closePrompt = e => {
        e.preventDefault();

        // Close "Clearing Watch History"-prompt
        setIsClearingWatchHistory(false);

        // Close "Moving Series"-prompt if there is one
        if (setIsMovingSeries) setIsMovingSeries(false);
    }

    // Return component
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

// Export component
export default ClearingWatchHistory;
