import React from 'react';
import * as ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from 'redux/store/store';
import reportWebVitals from './reportWebVitals';
import AppRouter from './AppRouter';
import 'assets/styles/reset.css';
import 'assets/styles/index.css';
import 'assets/styles/variables.css';
import Toasts from './components/layout/Toasts/Toasts';

const root = ReactDOM.createRoot((document.getElementById('root') as Element));
const element = (
    <Provider store={store}>
        <BrowserRouter>
            <AppRouter />
            <Toasts />
        </BrowserRouter>
    </Provider>
);
root.render(element);

reportWebVitals();
