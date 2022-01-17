import React from 'react';

const RemovingSeries = ({ series, userSeriesId, removeUserSeries, setIsRemovingUserSeries }) => {
    const handleClick = async e => {
        e.preventDefault();
        const answer = e.target.value;
        if (answer === 'Yes') {
            await removeUserSeries(userSeriesId);
            setIsRemovingUserSeries(false);
        } else {
            setIsRemovingUserSeries(false);
        }
    }

    return (
        <div className="removing-series-prompt" aria-live="polite">
            <h3>Are you sure you want to remove {series.name}?</h3>
            <button className="button" value='Yes' onClick={handleClick}>Yes</button>
            <button className="button" value='No' onClick={handleClick}>No</button>
        </div>
    );
}

export default RemovingSeries;