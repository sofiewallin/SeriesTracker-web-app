import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';

import Login from './Login';

import Header from './Header';
import Footer from './Footer';

import WatchingNow from './WatchingNow/WatchingNow';
import WatchNext from './WatchNext';
import HaveWatched from './HaveWatched';
import AddSeries from './AddSeries/AddSeries';
import SeriesDetails from './SeriesDetails';

const App = () => {
    const [appName] = useState('Series Tracker');
    const [apiUrl] = useState('https://series-tracker-rest-api.herokuapp.com');

    const [user, setUser] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);

    const [userSeriesList, setUserSeriesList] = useState([]);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    const getUser = () => {
        const userString = localStorage.getItem('user');
        const user = JSON.parse(userString);
        return user;
    }

    const logoutUser = () => {
        localStorage.removeItem('user');
        setUser(null);
        setLoggedIn(false);
    }

    const getUserSeriesList = async () => {
        try {
            const response = await fetch(`${apiUrl}/users/${user.userId}/series`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            });

            if ([401, 403].includes(response.status)) {
                logoutUser();
            } else {
                const userSeriesList = await response.json();

                if (!response.ok) {
                    throw new Error(response.statusText);
                }

                setUserSeriesList(userSeriesList);
                setError(null);
            }
        } catch (err) {
            setError('Something went wrong when getting list of series. Reload page and try again.');
        }
    }

    const addUserSeries = async newUserSeries => {
        try {
            const response = await fetch(`${apiUrl}/users/${user.userId}/add-series`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify(newUserSeries)
            });

            if ([401, 403].includes(response.status)) {
                logoutUser();
            } else {
                const addedUserSeries = await response.json();

                if (!response.ok) {
                    throw new Error(response.statusText);
                }

                setError(null);
                
                return addedUserSeries;
            }
        } catch (err) {
            setError('Something went wrong when adding series. Reload page and try again.');
        } finally {
            await getUserSeriesList();
        }
    }

    const removeUserSeries = async userSeriesId => {
        try {
            const response = await fetch(`${apiUrl}/users/${user.userId}/remove-series/${userSeriesId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            });

            if ([401, 403].includes(response.status)) {
                logoutUser();
            } else {
                const removedUserSeries = await response.json();

                if (!response.ok) {
                    throw new Error(response.statusText);
                }

                setError(null);

                return removedUserSeries;
            }
        } catch (err) {
            setError('Something went wrong when removing series. Reload page and try again.');
        } finally {
            await getUserSeriesList();
        }
    }

    useEffect(() => {
        (async () => {
            const storedUser = getUser();
            if (storedUser === null) return;

            setUser(getUser());

            try {
                const response = await fetch(`${apiUrl}/users/${storedUser.userId}/series`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${storedUser.token}`
                    }
                });

                if ([401, 403].includes(response.status)) {
                    logoutUser();
                } else {
                    const userSeriesList = await response.json();

                    if (!response.ok) {
                        throw new Error(response.statusText);
                    }

                    setUserSeriesList(userSeriesList);
                    setError(null);
                }
            } catch (err) {
                setError('Something went wrong when getting list of series. Reload page and try again.');
            } finally {
                setIsLoaded(true);
            }
        })();
    }, [loggedIn])

    if (!user) {
        return <Login appName={appName} apiUrl={apiUrl} setLoggedIn={setLoggedIn} />
    }

    if (error) {
        const message = document.querySelector('.message');
        message.classList.add('error', 'is-active');
        message.innerHTML = error;
    }
    
    return (
        <BrowserRouter>
            <Header appName={appName} />
                <main id="main-content">
                    <div className="message" aria-live="polite"></div>
                    {!isLoaded && <div className="loading">Loading...</div>}
                    {isLoaded && (
                        <Routes>
                            <Route path='/' element={
                                <WatchingNow 
                                    user={user}
                                    logoutUser={logoutUser}
                                    apiUrl={apiUrl}
                                    userSeriesList={userSeriesList}
                                    getUserSeriesList={getUserSeriesList}
                                />
                            } 
                            />
                            <Route path='watch-next' element={
                                <WatchNext 
                                    user={user}
                                    logoutUser={logoutUser}
                                    apiUrl={apiUrl}
                                    userSeriesList={userSeriesList}
                                    getUserSeriesList={getUserSeriesList}
                                />
                            } 
                            />
                            <Route path='have-watched' element={
                                <HaveWatched
                                    user={user}
                                    logoutUser={logoutUser}
                                    apiUrl={apiUrl}
                                    userSeriesList={userSeriesList}
                                    getUserSeriesList={getUserSeriesList}
                                />
                            } 
                            />
                            <Route path='add-series' element={
                                <AddSeries
                                    user={user}
                                    logoutUser={logoutUser}
                                    apiUrl={apiUrl}
                                    userSeriesList={userSeriesList}
                                    addUserSeries={addUserSeries}
                                    removeUserSeries={removeUserSeries}
                                />
                            } 
                            />
                            <Route path='series/:seriesId' element={
                                <SeriesDetails
                                    user={user}
                                    logoutUser={logoutUser}
                                    apiUrl={apiUrl}
                                    userSeriesList={userSeriesList}
                                    getUserSeriesList={getUserSeriesList}
                                    addUserSeries={addUserSeries}
                                    removeUserSeries={removeUserSeries}
                                />
                            } 
                            />
                            <Route path="*" element={(
                                <>
                                    <h1>This page doesn't exist!</h1>
                                    <p>Navigate in the menu to find your way!</p>
                                </>
                            )} />
                        </Routes>
                    )}
                </main> 
            <Footer appName={appName} logoutUser={logoutUser} />
        </BrowserRouter>
    );
}

export default App;