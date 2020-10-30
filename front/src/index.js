import React from 'react';
import ReactDOM from 'react-dom';
import Root from './Root';
import * as serviceWorker from './serviceWorker';
import axios from 'axios'

let server = window.location.protocol + "//" + window.location.hostname + ":" + window.location.port;

if (process.env.NODE_ENV === 'development') {
    server = "https://zego.life"
}

axios.defaults.baseURL = server + "/api/v1/"
axios.interceptors.request.use(config => {
    let token = localStorage.getItem("token")
    if (token != null) {
        config.headers.common["Heartbeat-Overheat"] = token
    }
    return config
})
axios.defaults.headers.common["Content-Type"] = "application/json;charset=utf8"

let theme = localStorage.getItem("theme")
if (theme === null) {
    if (window.matchMedia(`(prefers-color-scheme: dark)`).matches) {
        theme = "dark"
    } else {
        theme = "light"
    }
    localStorage.setItem("theme", theme)
}

switch (theme) {
    case "light":
        document.body.style.backgroundColor = "#eef1f5"
        break
    case "dark":
        break
    case "persona5":
        document.body.style.backgroundColor = "#f90100"
        document.body.style.backgroundImage = "url(\"/img/persona5.jpg\")"
        document.body.style.backgroundPosition = "86%"
        break
    default:
        break
}

ReactDOM.render(
    <React.StrictMode>
        <Root/>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
