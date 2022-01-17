import React, { useState } from 'react';
import jwt_decode from 'jwt-decode';

const Login = ({ appName, apiUrl, setLoggedIn }) => {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState(null);

    const loginUser = async loginDetails => {
        try {
            const response = await fetch(`${apiUrl}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginDetails)
            });
        
            const result = await response.json();
        
            if (!response.ok) {
                throw new Error('The username or password you have entered is invalid.');
            }
        
            return result;
        } catch (error) {
            setError(error.message);
        }
    }

    const createUser = async jwt => {
        const token = jwt.token;
        const decodedJwt = jwt_decode(token);
        const userId = decodedJwt.userId;
        
        const user = {
            token: token,
            userId: userId
        }

        return user;
    }

    const storeUser = async user => {
        localStorage.setItem('user', JSON.stringify(user));
    }

    const handleSubmit = async e => {
        e.preventDefault();

        const loginDetails = {
            username: username,
            password: password
        }
        
        const jwt = await loginUser(loginDetails);
        const user = await createUser(jwt);
        await storeUser(user);   
        setLoggedIn(true);
    }

    if (error) {
        const message = document.querySelector('.message');
        message.classList.add('error', 'is-active');
        message.innerHTML = error;
    }

    return (
        <>
            <header id="main-header">
                <h2>{ appName }</h2>
            </header>
            <main id="main-content">
                <form action="/" id="login-form" onSubmit={handleSubmit}>
                    <h1>Sign in</h1>
                    <div className="message" aria-live="polite"></div>
                    <p className="form-field form-text-field">
                        <label htmlFor="username-input">Username</label>
                        <input type="text" name="username" id="username-input" onChange={e => setUsername(e.target.value)} />
                    </p>
                    <p className="form-field form-text-field">
                        <label htmlFor="password-input">Password</label>
                        <input type="password" name="password" id="password-input" onChange={e => setPassword(e.target.value)} />
                    </p>
                    <p className="form-field form-submit-field">
                        <button type="submit" className="button button-submit">Sign in</button>
                    </p>
                </form>
            </main>
            <footer id="main-footer">
                <p className="copyright">&copy; { new Date().getFullYear() } { appName }</p>
            </footer>
        </>
    );
}

export default Login;