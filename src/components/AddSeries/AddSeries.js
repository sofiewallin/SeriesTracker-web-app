import React, { useState } from 'react';

import SearchedSeriesList from './partials/SearchedSeriesList';

const AddSeries = ({ user, logoutUser, apiUrl, userSeriesList, addUserSeries, removeUserSeries }) => {
    const [searchQuery, setSearchQuery] = useState(null);

    const handleSubmit = async e => {
        e.preventDefault();
        const input = e.target.querySelector('#search-input');
        setSearchQuery(input.value);
        input.value = '';
    }

    return (
        <>
            <h1>Add series</h1>
            <form action="/" id="search-series-form" onSubmit={handleSubmit}>
                <label htmlFor="search-input" className="visually-hidden">Search</label>
                <input type="search" name="search" id="search-input" />
                <button type="submit">Search series</button>
            </form>
            <section id="search-results">
                {searchQuery && (
                    <SearchedSeriesList 
                        user={user}
                        logoutUser={logoutUser}
                        apiUrl={apiUrl}
                        searchQuery={searchQuery} 
                        userSeriesList={userSeriesList}
                        addUserSeries={addUserSeries}
                        removeUserSeries={removeUserSeries}
                    />
                )}
                {!searchQuery && (
                    <>
                        <h2>Search series</h2>
                        <p>Enter the name of the series you want to add.</p>
                    </>
                )}
            </section>
        </>
    );
}

export default AddSeries;