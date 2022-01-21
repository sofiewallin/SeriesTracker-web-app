/**
 * Searched Series List Item component.
 * 
 * Renders a series in the searched series list. Checks if the series
 * is added to the user or not and sets an "Add"- or "Remove"- button
 * depending on that. Passes on series to other components for user 
 * actions.
 * 
 * @author: Sofie Wallin
 */

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import AddingSeries from '../../Series/partials/AddingSeries';
import RemovingSeries from '../../Series/partials/RemovingSeries';

const SearchedSeriesListItem = ({ series, userSeriesList, addUserSeries, removeUserSeries }) => {
    const [userSeries, setUserSeries] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    
    const [isAddingSeries, setIsAddingSeries] = useState(false);
    const [isRemovingSeries, setIsRemovingSeries] = useState(false);

    // Check if the series exist in the list of series added to the user
    useEffect(() => {
        (async () => {
            const addedUserSeries = userSeriesList.filter(userSeries => userSeries.series_id === series._id);
            if(addedUserSeries.length > 0) {
                setUserSeries(addedUserSeries[0]);
            } else {
                setUserSeries(null);
            }
            setIsLoaded(true);
        })();
    }, [userSeriesList]) // Run again if the list of series added to the user changes

    // Handle click of the "Add Series"-button
    const handleAdd = async e => {
        e.preventDefault();
        setIsAddingSeries(true);
    }

    // Handle click of the "Remove Series"-button
    const handleRemove = async e => {
        e.preventDefault();
        setIsRemovingSeries(true);
    }

    // Show loading message until the check against the list of series added to the user is done
    if (!isLoaded) return <div className='loading'>Loading...</div>

    // Return component
    return (
        <article className='series-list-item box box-link clear'>
            <h3 className='heading heading-list-item'><Link to={'/series/' + series._id}>{series.name}</Link></h3>
            {!userSeries && (
                <>
                    <button className='button button-add button-small' onClick={handleAdd}>Add Series</button>
                    {isAddingSeries && (
                        <AddingSeries
                            series={series}
                            addUserSeries={addUserSeries}
                            setIsAddingSeries={setIsAddingSeries}
                        />
                    )}
                </>
            )}
            {userSeries && (
                <>
                    <button className='button button-remove button-small' onClick={handleRemove}>Remove Series</button>
                    {isRemovingSeries && (
                        <RemovingSeries 
                            series={series} 
                            userSeriesId={userSeries._id} 
                            removeUserSeries={removeUserSeries} 
                            setIsRemovingSeries={setIsRemovingSeries} 
                        />
                    )}
                </>
            )}
        </article>
    );
}

// Export the component
export default SearchedSeriesListItem;
