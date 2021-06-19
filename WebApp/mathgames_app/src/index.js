import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.js';
import reportWebVitals from './reportWebVitals';


/* Services */
import AuthService from "./Services/auth.service"


/* Uuid */
import { v4 as uuidv4 } from 'uuid';

/* Socket */
import {urlAPI} from "./data/data";
import io from "socket.io-client";
let socket = io(urlAPI);

if (sessionStorage.getItem('user_id') === null)
    sessionStorage.setItem('user_id', "Guest_" + uuidv4());	

var current_user_id = AuthService.getCurrentUserId();

socket.emit("new_user", {"user_id": current_user_id})

export default socket;

ReactDOM.render(<App />, document.getElementById('root'));


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
