import React, { useEffect, useState } from 'react';

import SearchedSeriesListItem from './SearchedSeriesListItem';

const SearchedSeriesList = ({ user, logoutUser, apiUrl, searchQuery, seriesList, addSeries, removeSeries }) => {
    const [searchedSeriesList, setSearchedSeriesList] = useState([]);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                const response = await fetch(`${apiUrl}/series/search/${searchQuery}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.token}`
                    }
                });
    
                if ([401, 403].includes(response.status)) {
                    logoutUser();
                } else {
                    const searchedSeriesList = await response.json();
    
                    if (!response.ok) {
                        throw new Error(response.statusText);
                    }
    
                    setSearchedSeriesList(searchedSeriesList);
                    setError(null);
                }
            } catch (err) {
                setError('Something went wrong when searching series. Reload page and try again.');
            } finally {
                setIsLoaded(true);
            }
        })();
    }, [searchQuery])
   
    if (error) {
        const message = document.querySelector('.message');
        message.classList.add('error', 'is-active');
        message.innerHTML = error;
    }
    
    if (!isLoaded) return <div className="loading">Loading...</div>

    return (
        <ul className="series-list">
            {}
            {searchedSeriesList.map(series => (
                <li key={series._id}>
                    {<SearchedSeriesListItem 
                        series={series} 
                        seriesList={seriesList}
                        addSeries={addSeries}
                        removeSeries={removeSeries}
                    />}
                </li>
            ))}
            {searchedSeriesList.length === 0 && (<li>There were no series matching your search.</li>)}
        </ul>
    );
}

export default SearchedSeriesList;