import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import AddingSeries from './AddingSeries';

const AddSeriesListItem = ({ series, userSeriesList, addUserSeries, removeUserSeries }) => {
    const [action, setAction] = useState(null);
    const [value, setValue] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    const [isAddingSeries, setIsAddingSeries] = useState(false);

    useEffect(() => {
        (async () => {
            const addedUserSeries = userSeriesList.filter(userSeries => userSeries.series_id === series._id);
            if(addedUserSeries.length > 0) {
                setValue(addedUserSeries[0]._id);
                setAction('remove');
            } else {
                setValue(null);
                setAction('add');
            }

            setIsLoaded(true);
        })();
    }, [userSeriesList])

    const handleClick = async e => {
        e.preventDefault();
        if (action === 'add') {
            setIsAddingSeries(true);
        } else {
            const userSeriesId = e.target.value;
            await removeUserSeries(userSeriesId);
        }
    }

    if (!isLoaded) return <div className="loading">Loading...</div>

    return (
        <>
            <article className="series">
                <h3><Link to={'/series/' + series._id}>{series.name}</Link></h3>
                <button className={`button button-${action}`} onClick={handleClick} value={value}>{action} series</button>
            </article>
            {isAddingSeries && (
                <AddingSeries
                    series={series}
                    addUserSeries={addUserSeries}
                    setIsAddingSeries={setIsAddingSeries}
                />
            )}
        </>
    );
}

export default AddSeriesListItem;