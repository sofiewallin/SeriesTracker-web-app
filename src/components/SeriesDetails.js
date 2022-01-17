import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Series from './Series/Series';

const SeriesDetails = ({ user, logoutUser, apiUrl, userSeriesList, setUserSeriesList, getUserSeriesList, addUserSeries, removeUserSeries }) => {
    const { seriesId } = useParams();
    const [userSeries, setUserSeries] = useState(null);

    useEffect(() => {
        (async () => {
            const addedUserSeries = userSeriesList.filter(userSeries => userSeries.series_id === seriesId);
            if(addedUserSeries.length > 0) {
                setUserSeries(addedUserSeries[0]);
            } else {
                setUserSeries(null);
            }
        })();
    }, [userSeriesList])

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

export default SeriesDetails;
