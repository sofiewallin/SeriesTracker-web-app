/**
 * Removing Series component.
 * 
 * Handles prompt when removing series and uses function
 * to remove series to user in the App component.
 * 
 * @author: Sofie Wallin
 */

import React from 'react';

const RemovingSeries = ({ series, userSeriesId, removeUserSeries, setIsRemovingSeries }) => {
    // Handle click on Y/N-buttons
    const handleClick = async e => {
        e.preventDefault();
        const answer = e.target.value;

        /* Remove series with function from App component 
        if answer is yes, otherwise close prompt */
        if (answer === 'Yes') {
            // Remove series to user
            await removeUserSeries(userSeriesId);

            // Close prompt
            setIsRemovingSeries(false);
        } else {
            // Close prompt
            setIsRemovingSeries(false);
        }
    }

    // Handle click on close button
    const closePrompt = e => {
        e.preventDefault();

        // Close prompt
        setIsRemovingSeries(false);
    }

    // Return component
    return (
        <div className='prompt-wrapper'>
            <div className="prompt centered" aria-live="polite">
                <button className='button-close' onClick={closePrompt}><span className='hidden-visually'>Close</span></button>
                <h3 className='heading'>Are you sure you want to remove {series.name}?</h3>
                <div className='clear'>
                    <button className='button button-small button-50' value='Yes' onClick={handleClick}>Yes</button>
                    <button className='button button-small button-50' value='No' onClick={handleClick}>No</button>
                </div>
            </div>
        </div>
    );
}

// Export component
export default RemovingSeries;
