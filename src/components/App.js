import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Login from './Login';

import Header from './Header';
import Footer from './Footer';

import WatchingNow from './WatchingNow/WatchingNow';
import WatchNext from './WatchNext';
import HaveWatched from './HaveWatched';
import AddSeries from './AddSeries/AddSeries';

const App = () => {
    const [appName] = useState('Series Tracker');
    const [apiUrl] = useState('https://dt162g-projekt-api.herokuapp.com');

    const [user, setUser] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);

    const [seriesList, setSeriesList] = useState([]);
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

    const getSeriesList = async () => {
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
                const seriesList = await response.json();

                if (!response.ok) {
                    throw new Error(response.statusText);
                }

                setSeriesList(seriesList);
                setError(null);
            }
        } catch (err) {
            setError('Something went wrong when getting list of series. Reload page and try again.');
        } finally {
            setIsLoaded(true);
        }
    }

    const addSeries = async newSeries => {
        try {
            const response = await fetch(`${apiUrl}/users/${user.userId}/add-series`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify(newSeries)
            });

            if ([401, 403].includes(response.status)) {
                logoutUser();
            } else {
                const series = await response.json();

                if (!response.ok) {
                    throw new Error(response.statusText);
                }

                setError(null);
                
                return series;
            }
        } catch (err) {
            setError('Something went wrong when adding series. Reload page and try again.');
        } finally {
            setSeriesList(getSeriesList());
            setIsLoaded(true);
        }
    }

    const removeSeries = async seriesId => {
        try {
            const response = await fetch(`${apiUrl}/users/${user.userId}/remove-series/${seriesId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            });

            if ([401, 403].includes(response.status)) {
                logoutUser();
            } else {
                const series = await response.json();

                if (!response.ok) {
                    throw new Error(response.statusText);
                }

                setError(null);

                return series;
            }
        } catch (err) {
            setError('Something went wrong when removing series. Reload page and try again.');
        } finally {
            setSeriesList(getSeriesList());
            setIsLoaded(true);
        }
    }

    useEffect(() => {
        (async () => {
            const storedUser = getUser();
            setUser(getUser());

            if (storedUser === null) return;

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
                    const seriesList = await response.json();

                    if (!response.ok) {
                        throw new Error(response.statusText);
                    }

                    setSeriesList(seriesList);
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
        <BrowserRouter basename={BASENAME}>
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
                                    seriesList={seriesList}
                                    getSeriesList={getSeriesList}
                                />
                            } 
                            />
                            <Route path='watch-next' element={
                                <WatchNext 
                                    user={user}
                                    logoutUser={logoutUser}
                                    apiUrl={apiUrl}
                                    seriesList={seriesList}
                                    getSeriesList={getSeriesList}
                                />
                            } 
                            />
                            <Route path='have-watched' element={
                                <HaveWatched
                                    user={user}
                                    logoutUser={logoutUser}
                                    apiUrl={apiUrl}
                                    seriesList={seriesList}
                                    getSeriesList={getSeriesList}
                                />
                            } 
                            />
                            <Route path='add-series' element={
                                <AddSeries
                                    user={user}
                                    logoutUser={logoutUser}
                                    apiUrl={apiUrl}
                                    seriesList={seriesList}
                                    addSeries={addSeries}
                                    removeSeries={removeSeries}
                                />
                            } 
                            />
                        </Routes>
                    )}
                </main> 
            <Footer appName={appName} logoutUser={logoutUser} />
        </BrowserRouter>
    );
}

export default App;