// React packages
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'
// Styles
// import './bootstrap.min.css'
import './index.css';
// High level Components
import App from './App';
// Store
import store from './store.js'


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
