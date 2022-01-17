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

    return (
        <div className="choose-watching-status-prompt" aria-live="polite">
            <h3>Where do you want do add {series.name}?</h3>
            <button className="button" value='Watching now' onClick={handleClick}>Watching now</button>
            <button className="button" value='Watch next' onClick={handleClick}>Watch next</button>
            <button className="button" value='Have watched' onClick={handleClick}>Have watched</button>
        </div>
    );
}

export default AddingSeries;