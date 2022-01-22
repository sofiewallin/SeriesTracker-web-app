/**
 * Moving Series component.
 * 
 * Handles prompt when moving series and uses function to change
 * watching status on series in the Series component. Passes on to 
 * Clearing Watch History component if watching status is "Have
 * Watched".
 * 
 * @author: Sofie Wallin
 */

import React, { useRef, useState } from 'react';

import ClearingWatchHistory from './ClearingWatchHistory';

const MovingSeries = ({ series, watchingStatus, changeWatchingStatus, clearWatchHistory, setIsMovingSeries }) => {
    const newWatchingStatus = useRef(null);
    const [isClearingWatchHistory, setIsClearingWatchHistory] = useState(false);

    // Handle click on one of the "watching status"-buttons
    const handleClick = async e => {
        e.preventDefault();
        newWatchingStatus.current = e.target.value;
        
        /* Check if watching status is currently "Have Watched" and 
        render Clearing Watch History component if it is. Otherwise
        update watching status with function from Series component. */
        if (watchingStatus === 'Have watched') {
            setIsClearingWatchHistory(true);
        } else {
            // Change watching status with function in the Series component
            await changeWatchingStatus(newWatchingStatus.current);

            // Close prompt
            setIsMovingSeries(false);
        }
    }

    // Handle click on close button
    const closePrompt = e => {
        e.preventDefault();

        // Close prompt
        setIsMovingSeries(false);
    }

    // Return component based on watching status
    if (watchingStatus === 'Watching now') {
        return (
            <div className='prompt-wrapper'>
                <div className='prompt centered' aria-live='polite'>
                    <h3 className='heading'>Where do you want {series.name}?</h3>
                    <p>Currently in: <em>{watchingStatus}</em></p>
                    <div className='clear'>
                        <button className='button button-small button-50' value='watch-next' onClick={handleClick}>Watch next</button>
                        <button className='button button-small button-50' value='have-watched' onClick={handleClick}>Have Watched</button>
                    </div>
                    <button className='button-close' onClick={closePrompt}><span className='hidden-visually'>Close</span></button>
                </div>
            </div>
        );
    } else if (watchingStatus === 'Watch next') {
        return (
            <div className='prompt-wrapper'>
                <div className="prompt centered" aria-live='polite'>
                    <h3 className='heading'>Where do you want {series.name}?</h3>
                    <p>Currently in: <em>{watchingStatus}</em></p>
                    <div className='clear'>
                        <button className='button button-small button-50' value='watching-now' onClick={handleClick}>Watching now</button>
                        <button className='button button-small button-50' value='have-watched' onClick={handleClick}>Have Watched</button>
                    </div>
                    <button className='button-close' onClick={closePrompt}><span className='hidden-visually'>Close</span></button>
                </div>
            </div>
        );
    } else {
        return (
            <>
                <div className='prompt-wrapper changing-watching-status-prompt-wrapper'>
                    <div className='prompt centered' aria-live='polite'>
                        <h3 className='heading'>Where do you want {series.name}?</h3>
                        <p>Currently in: <em>{watchingStatus}</em></p>
                        <div className='clear'>
                            <button className='button button-small button-50' value='watching-now' onClick={handleClick}>Watching now</button>
                            <button className='button button-small button-50' value='watch-next' onClick={handleClick}>Watch next</button>
                        </div>
                        <button className='button-close' onClick={closePrompt}><span className='hidden-visually'>Close</span></button>
                    </div>
                </div>
                {isClearingWatchHistory && (
                    <ClearingWatchHistory
                        series={series}
                        newWatchingStatus={newWatchingStatus.current}
                        changeWatchingStatus={changeWatchingStatus}
                        clearWatchHistory={clearWatchHistory}
                        setIsClearingWatchHistory={setIsClearingWatchHistory}
                        setIsMovingSeries={setIsMovingSeries}
                    />
                )}
            </>
        );
    }
}

// Export component
export default MovingSeries;
