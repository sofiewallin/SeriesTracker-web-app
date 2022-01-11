import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ appName }) => {
    return (
        <header id="main-header">
            <h2>{ appName }</h2>
            <nav id="main-navigation">
                <Link to='/'>Watching now</Link>
                <Link to='/watch-next'>Watch next</Link>
            </nav>
        </header>
    );
}

export default Header;