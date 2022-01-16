import React from 'react';
import { render } from 'react-dom';
import App from './components/App';
import './sass/App.scss';

const rootElement = document.querySelector('#root');
render(<App />, rootElement);