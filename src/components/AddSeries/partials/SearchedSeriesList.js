/**
 * Searched Series List component.
 * 
 * Handles the search query and uses it to search the API
 * for series based on name. The result is a list of series,
 * and each series in the list gets passed to another component
 * that handles the series list item.
 * 
 * @author: Sofie Wallin
 */

import React, { useEffect, useState } from 'react';

import SearchedSeriesListItem from './SearchedSeriesListItem';

const SearchedSeriesList = ({ user, logoutUser, apiUrl, searchQuery, userSeriesList, addUserSeries, removeUserSeries }) => {
    const [searchedSeriesList, setSearchedSeriesList] = useState([]);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    // Search series based on name in API using query from search field
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
                
                // Logout user if token has expired
                if ([401, 403].includes(response.status)) {
                    logoutUser();
                } else {
                    const searchedSeriesList = await response.json();
    
                    if (!response.ok) {
                        throw new Error(response.statusText);
                    }
                    
                    // Set list of searched series to state
                    setSearchedSeriesList(searchedSeriesList);

                    setError(null);
                }
            } catch (err) {
                setError('Something went wrong when searching series. Reload page and try again.');
            } finally {
                setIsLoaded(true);
            }
        })();
    }, [searchQuery]) // Run again if search query changes
    
    // Show error if there is one
    if (error) {
        const message = document.querySelector('.message');
        message.classList.add('error', 'is-active');
        message.innerHTML = error;
    }
    
    // Show loading message until API search is complete
    if (!isLoaded) return <div className='loading'>Loading...</div>

    // Return component
    return (
        <ul className='series-list'>
            {searchedSeriesList.map(series => (
                <li key={series._id}>
                    {<SearchedSeriesListItem 
                        series={series} 
                        userSeriesList={userSeriesList}
                        addUserSeries={addUserSeries}
                        removeUserSeries={removeUserSeries}
                    />}
                </li>
            ))}
            {searchedSeriesList.length === 0 && (<li>There were no series matching your search.</li>)}
        </ul>
    );
}

// Export component
export default SearchedSeriesList;
