import React, { useState } from 'react';

import ClearingWatchHistory from './ClearingWatchHistory';

const MovingSeries = ({ series, watchingStatus, changeWatchingStatus, clearWatchHistory, setIsMovingSeries }) => {
    const [isClearingWatchHistory, setIsClearingWatchHistory] = useState(false);
    const handleClick = async e => {
        e.preventDefault();
        const watchingStatusParameter = e.target.value;
        
        if (watchingStatus === 'Have watched') {
            setIsClearingWatchHistory(true);
        } else {
            await changeWatchingStatus(watchingStatusParameter);
            setIsMovingSeries(false);
        }
    }

    const closePrompt = e => {
        e.preventDefault();
        setIsMovingSeries(false);
    }

    if (watchingStatus === 'Watching now') {
        return (
            <div className='prompt-wrapper'>
                <div className="prompt centered" aria-live="polite">
                    <h3 className='heading'>Where do you want {series.name}?</h3>
                    <p>Currently in: <em>{watchingStatus}</em></p>
                    <div className='clear'>
                        <button className="button button-small button-50" value='watch-next' onClick={handleClick}>Watch next</button>
                        <button className="button button-small button-50" value='have-watched' onClick={handleClick}>Have Watched</button>
                    </div>
                    <button className='button-close' onClick={closePrompt}><span className='hidden-visually'>Close</span></button>
                </div>
            </div>
        );
    } else if (watchingStatus === 'Watch next') {
        return (
            <div className='prompt-wrapper'>
                <div className="prompt centered" aria-live="polite">
                    <h3 className='heading'>Where do you want {series.name}?</h3>
                    <p>Currently in: <em>{watchingStatus}</em></p>
                    <div className='clear'>
                        <button className="button button-small button-50" value='watching-now' onClick={handleClick}>Watching now</button>
                        <button className="button button-small button-50" value='have-watched' onClick={handleClick}>Have Watched</button>
                    </div>
                    <button className='button-close' onClick={closePrompt}><span className='hidden-visually'>Close</span></button>
                </div>
            </div>
        );
    } else {
        return (
            <>
                <div className='prompt-wrapper changing-watching-status-prompt-wrapper'>
                    <div className="prompt centered" aria-live="polite">
                        <h3 className='heading'>Where do you want {series.name}?</h3>
                        <p>Currently in: <em>{watchingStatus}</em></p>
                        <div className='clear'>
                            <button className="button button-small button-50" value='watching-now' onClick={handleClick}>Watching now</button>
                            <button className="button button-small button-50" value='watch-next' onClick={handleClick}>Watch next</button>
                        </div>
                        <button className='button-close' onClick={closePrompt}><span className='hidden-visually'>Close</span></button>
                    </div>
                </div>
                {isClearingWatchHistory && (
                    <ClearingWatchHistory
                        series={series}
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

export default MovingSeries;