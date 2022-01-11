import React from 'react';

const Footer = ({ appName }) => {
    return (
        <footer id="main-footer">
            <p className="copyright">&copy; { new Date().getFullYear() } { appName }</p>
            <a href="#" className="back-to-top">Back to top</a>
        </footer>
    );
}

export default Footer;