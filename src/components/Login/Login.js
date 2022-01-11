import React, { useState } from 'react';
import PropTypes from 'prop-types';

import loginUser from './loginUser';

const Login = ({ appName, setToken }) => {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = async e => {
        e.preventDefault();

        const credentials = {
            username: username,
            password: password
        }
        
        const token = await loginUser(credentials);
        setToken(token);
    }

    return (
        <>
            <header id="main-header">
                <h2>{ appName }</h2>
            </header>
            <main id="main-content">
                <form action="/" id="login-form" onSubmit={handleSubmit}>
                    <h1>Sign in</h1>
                    <div className="error" aria-live="polite"></div>
                    <p className="form-field form-text-field">
                        <label htmlFor="username-input">Username</label>
                        <input type="text" name="username" id="username-input" onChange={e => setUsername(e.target.value)} />
                    </p>
                    <p className="form-field form-text-field">
                        <label htmlFor="password-input">Password</label>
                        <input type="password" name="password" id="password-input" onChange={e => setPassword(e.target.value)} />
                    </p>
                    <p className="form-field form-submit-field">
                        <button type="submit">Sign in</button>
                    </p>
                </form>
            </main>
            <footer id="main-footer">
                <p className="copyright">&copy; { new Date().getFullYear() } { appName }</p>
            </footer>
        </>
    );
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}

export default Login;