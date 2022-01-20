import React from 'react';

const AddingSeries = ({ series, addUserSeries, setIsAddingSeries }) => {
    const handleClick = async e => {
        e.preventDefault();
        const watchingStatus = e.target.value;

        const newUserSeries = {
            series_id: series._id,
            watchingStatus: watchingStatus
        }

        await addUserSeries(newUserSeries);
        setIsAddingSeries(false);
    }

    const closePrompt = e => {
        e.preventDefault();
        setIsAddingSeries(false);
    }

    return (
        <div className='prompt-wrapper'>
            <div className="prompt centered" aria-live="polite">
                <h3 className='heading'>Where do you want do add <em>{series.name}</em>?</h3>
                <button className="button button-small" value='Watching now' onClick={handleClick}>Watching now</button>
                <button className="button button-small" value='Watch next' onClick={handleClick}>Watch next</button>
                <button className="button button-small" value='Have watched' onClick={handleClick}>Have watched</button>
                <button className='button-close' onClick={closePrompt}><span className='hidden-visually'>Close</span></button>
            </div>
        </div>
    );
}

export default AddingSeries;