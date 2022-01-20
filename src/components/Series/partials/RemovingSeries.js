import React from 'react';

const RemovingSeries = ({ series, userSeriesId, removeUserSeries, setIsRemovingSeries }) => {
    const handleClick = async e => {
        e.preventDefault();
        const answer = e.target.value;
        if (answer === 'Yes') {
            await removeUserSeries(userSeriesId);
            setIsRemovingSeries(false);
        } else {
            setIsRemovingSeries(false);
        }
    }

    const closePrompt = e => {
        e.preventDefault();
        setIsRemovingSeries(false);
    }

    return (
        <div className='prompt-wrapper'>
            <div className="prompt centered" aria-live="polite">
                <button className='button-close' onClick={closePrompt}><span className='hidden-visually'>Close</span></button>
                <h3 className='heading'>Are you sure you want to remove {series.name}?</h3>
                <div className='clear'>
                    <button className="button button-small button-50" value='Yes' onClick={handleClick}>Yes</button>
                    <button className="button button-small button-50" value='No' onClick={handleClick}>No</button>
                </div>
            </div>
        </div>
    );
}

export default RemovingSeries;