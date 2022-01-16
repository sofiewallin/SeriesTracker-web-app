import React from 'react';

const Footer = ({ appName, logoutUser }) => {

    const handleClick = async e => {
        e.preventDefault();
        logoutUser();
    }

    return (
        <footer id="main-footer">
            <p className="copyright">&copy; { new Date().getFullYear() } { appName }</p>
            <a href="#" className="back-to-top">Back to top</a>
            <button onClick={handleClick}>Sign out</button>
        </footer>
    );
}

export default Footer;