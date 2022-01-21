/**
 * Adding Series component.
 * 
 * Handles prompt when adding series and uses function
 * to add series to user in the App component.
 * 
 * @author: Sofie Wallin
 */

import React from 'react';

const AddingSeries = ({ series, addUserSeries, setIsAddingSeries }) => {
    // Handle click on one of the "watching status"-buttons
    const handleClick = async e => {
        e.preventDefault();
        const watchingStatus = e.target.value;

        /* Construct new series to add to user based on the
        passed in series and the chosen watching status */
        const newUserSeries = {
            series_id: series._id,
            watchingStatus: watchingStatus
        }

        // Add series with function from the App component
        await addUserSeries(newUserSeries);

        // Close prompt
        setIsAddingSeries(false);
    }

    // Handle click on close button
    const closePrompt = e => {
        e.preventDefault();

        // Close prompt
        setIsAddingSeries(false);
    }

    // Return component
    return (
        <div className='prompt-wrapper'>
            <div className='prompt centered' aria-live='polite'>
                <h3 className='heading'>Where do you want do add <em>{series.name}</em>?</h3>
                <button className='button button-small' value='Watching now' onClick={handleClick}>Watching now</button>
                <button className='button button-small' value='Watch next' onClick={handleClick}>Watch next</button>
                <button className='button button-small' value='Have watched' onClick={handleClick}>Have watched</button>
                <button className='button-close' onClick={closePrompt}><span className='hidden-visually'>Close</span></button>
            </div>
        </div>
    );
}

// Export component
export default AddingSeries;
