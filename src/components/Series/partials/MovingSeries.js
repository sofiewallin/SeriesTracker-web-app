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

    if (watchingStatus === 'Watching now') {
        return (
            <div className="changing-watching-status-prompt" aria-live="polite">
                <h3>Where do you want {series.name}?</h3>
                <button className="button" value='watch-next' onClick={handleClick}>Watch next</button>
                <button className="button" value='have-watched' onClick={handleClick}>Have Watched</button>
            </div>
        );
    } else if (watchingStatus === 'Watch next') {
        return (
            <div className="changing-watching-status-prompt" aria-live="polite">
                <h3>Where do you want {series.name}?</h3>
                <button className="button" value='watching-now' onClick={handleClick}>Watching now</button>
                <button className="button" value='have-watched' onClick={handleClick}>Have Watched</button>
            </div>
        );
    } else {
        return (
            <>
                <div className="changing-watching-status-prompt" aria-live="polite">
                    <h3>Where do you want {series.name}?</h3>
                    <button className="button" value='watching-now' onClick={handleClick}>Watching now</button>
                    <button className="button" value='watch-next' onClick={handleClick}>Watch next</button>
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