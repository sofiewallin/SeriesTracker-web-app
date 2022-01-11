import React from 'react';
import { Outlet } from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';

const Layout = ({ appName }) => {
    return (
        <>
            <Header appName={appName} />
            <main id="main-content">
                <Outlet />
            </main>
            <Footer appName={appName} />
        </>
    );
}

export default Layout;