import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import useToken from './useToken';

import Layout from '../Layout';

import Login from '../Login/Login';
import WatchingNow from '../WatchingNow';
import WatchNext from '../WatchNext';

const appName = 'Series Tracker';

const App = () => {
    const { token, setToken } = useToken();

    if (!token) return <Login setToken={setToken} appName={appName} />

    return (
        <>
            <BrowserRouter basename={ BASENAME }>
                <Routes>
                    <Route path='/' element={<Layout appName={appName} />}>
                        <Route path='/' element={<WatchingNow />} />
                        <Route path='watch-next' element={<WatchNext />} />
                    </Route>
                </Routes>     
            </BrowserRouter>
        </>
    );
}

export default App;
