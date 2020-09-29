import React from 'react';
import ReactDOM from 'react-dom';
import Root from './Root';
import * as serviceWorker from './serviceWorker';
import axios from 'axios'

let server = window.location.protocol + "//" + window.location.hostname + ":" + window.location.port;
axios.defaults.baseURL = server + "/api/v1/"
axios.interceptors.request.use(config => {
    let token = localStorage.getItem("token")
    if (token != null) {
        config.headers.common["Heartbeat-Overheat"] = token
    }
    return config
})
axios.defaults.headers.common["Content-Type"] = "application/json;charset=utf8"

ReactDOM.render(
    <React.StrictMode>
        <Root/>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
