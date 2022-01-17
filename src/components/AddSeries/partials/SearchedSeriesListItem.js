import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import AddingSeries from '../../Series/partials/AddingSeries';
import RemovingSeries from '../../Series/partials/RemovingSeries';

const SearchedSeriesListItem = ({ series, userSeriesList, addUserSeries, removeUserSeries }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [userSeries, setUserSeries] = useState(null);

    const [isAddingSeries, setIsAddingSeries] = useState(false);
    const [isRemovingSeries, setIsRemovingSeries] = useState(false);

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
    }, [userSeriesList])

    const handleAdd = async e => {
        e.preventDefault();
        setIsAddingSeries(true);
    }

    const handleRemove = async e => {
        e.preventDefault();
        setIsRemovingSeries(true);
    }

    if (!isLoaded) return <div className="loading">Loading...</div>

    return (
        <>
            <article className="series">
                <h3><Link to={'/series/' + series._id}>{series.name}</Link></h3>
                {!userSeries && (
                    <>
                        <button className="button button-add" onClick={handleAdd}>Add Series</button>
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
                        <button className="button button-remove" onClick={handleRemove}>Remove Series</button>
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
        </>
    );
}

export default SearchedSeriesListItem;