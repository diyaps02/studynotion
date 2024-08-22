import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {configureStore} from "@reduxjs/toolkit"
import {Provider} from 'react-redux';
import rootreducer from "./reducer/index.js";
import { BrowserRouter} from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

const store =configureStore({
   reducer:rootreducer,
});

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
   <BrowserRouter>
   <Provider store={store}>
   <App/>
   <Toaster/>
   </Provider>
   
   </BrowserRouter>
);

reportWebVitals();
