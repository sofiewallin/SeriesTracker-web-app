import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

import useToken from './useToken';

import Layout from '../Layout/Layout';

import Login from '../Login/Login';
import WatchingNow from '../WatchingNow';
import WatchNext from '../WatchNext';
import HaveWatched from '../HaveWatched';
import AddSeries from '../AddSeries';

const appName = 'Series Tracker';

const App = () => {
    const { token, setToken } = useToken();

    let userId;
    
    if (token) {
        userId = jwt_decode(token).userId;
    } else {
        return <Login setToken={setToken} appName={appName} />
    }

    return (
        <>
            <BrowserRouter basename={ BASENAME }>
                <Routes>
                    <Route path='/' element={<Layout appName={appName} />}>
                        <Route path='/' element={<WatchingNow token={token} userId={userId} />} />
                        <Route path='watch-next' element={<WatchNext />} />
                        <Route path='have-watched' element={<HaveWatched />} />
                        <Route path='add-series' element={<AddSeries />} />
                    </Route>
                </Routes>     
            </BrowserRouter>
        </>
    );
}

export default App;
