/**
 * Series Details component.
 * 
 * Entry for the Series route: /series/:id.
 * 
 * Takes a series id as a parameter from the url and checks
 * if series is added to user or not. Passes series on to
 * Series component and sets it as an added series if it is.
 * 
 * @author: Sofie Wallin
 */

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Series from './Series/Series';

const SeriesDetails = ({ user, logoutUser, apiUrl, userSeriesList, setUserSeriesList, getUserSeriesList, addUserSeries, removeUserSeries }) => {
    const { seriesId } = useParams();
    const [userSeries, setUserSeries] = useState(null);

    // Check if the series exist in the list of series added to the user
    useEffect(() => {
        (async () => {
            const addedUserSeries = userSeriesList.filter(userSeries => userSeries.series_id === seriesId);
            if(addedUserSeries.length > 0) {
                setUserSeries(addedUserSeries[0]);
            } else {
                setUserSeries(null);
            }
        })();
    }, [userSeriesList]) // Run again if the list of series added to the user changes

    // Return component
    return (
        <Series 
            user={user} 
            logoutUser={logoutUser} 
            apiUrl={apiUrl} 
            userSeries={userSeries} 
            seriesId={seriesId} 
            isListItem={false}
            setUserSeriesList={setUserSeriesList}
            getUserSeriesList={getUserSeriesList}
            addUserSeries={addUserSeries}
            removeUserSeries={removeUserSeries}
        />
    );
}

// Export component
export default SeriesDetails;
