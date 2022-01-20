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
            <h1 className='hidden-visually'>Add series</h1>
            <form action="/" className="search-form clear" onSubmit={handleSubmit}>
                <label htmlFor="search-input" className="hidden-visually">Search</label>
                <input type="search" name="search" id="search-input" className='search-input' placeholder='Enter a series name'/>
                <button type="submit" className="button button-search"><span className='hidden-visually'>Search series</span></button>
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
                        <h2 className='heading heading-big'>Search series</h2>
                        <p className='big-text'>Enter the name of the series you want to add.</p>
                    </>
                )}
            </section>
        </>
    );
}

export default AddSeries;