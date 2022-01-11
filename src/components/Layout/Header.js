import React from 'react';
import { NavLink as Link } from 'react-router-dom';

const Header = ({ appName }) => {
    return (
        <header id="main-header">
            <h2>{ appName }</h2>
            <nav id="main-navigation">
                <ul className="menu">
                    <li>
                        <Link end to='/' className={({ isActive }) => (isActive ? 'active' : 'inactive')}>
                            Watching now
                        </Link>
                    </li>
                    <li>
                        <Link end to='/watch-next' className={({ isActive }) => (isActive ? 'active' : 'inactive')}>Watch next</Link>
                    </li>
                    <li>
                        <Link end to='/have-watched' className={({ isActive }) => (isActive ? 'active' : 'inactive')}>Have watched</Link>
                    </li>
                    <li>
                        <Link end to='/add-series' className={({ isActive }) => 'button' + (isActive ? ' active' : ' inactive')}>Add series</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;