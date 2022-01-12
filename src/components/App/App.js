import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

import useToken from './useToken';

import Layout from '../Layout/Layout';

import Login from '../Login/Login';
import logoutUser from '../Login/logoutUser';
import WatchingNow from '../WatchingNow';
import WatchNext from '../WatchNext';
import HaveWatched from '../HaveWatched';
import AddSeries from '../AddSeries';

const appName = 'Series Tracker';

const App = () => {
    const { token, setToken } = useToken();

    let userId;
    
    if (token) {
        const decodedJwt = jwt_decode(token);
        userId = decodedJwt.userId;

        if (decodedJwt.exp * 1000 < Date.now()) {
            logoutUser();
        }
    } else {
        return <Login setToken={setToken} appName={appName} />
    }

    return (
        <>
            <BrowserRouter basename={ BASENAME }>
                <Routes>
                    <Route path='/' element={<Layout appName={appName} />}>
                        <Route path='/' element={<WatchingNow token={token} userId={userId} />} />
                        <Route path='watch-next' element={<WatchNext token={token} userId={userId} />} />
                        <Route path='have-watched' element={<HaveWatched token={token} userId={userId} />} />
                        <Route path='add-series' element={<AddSeries />} />
                    </Route>
                </Routes>     
            </BrowserRouter>
        </>
    );
}

export default App;
