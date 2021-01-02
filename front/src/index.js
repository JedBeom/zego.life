import React from 'react';
import ReactDOM from 'react-dom';
import Root from './Root';
import * as serviceWorker from './serviceWorker';
import axios from 'axios'

// let server = window.location.protocol + "//" + window.location.hostname + ":" + window.location.port;
let server = "https://zego.life"

if (process.env.NODE_ENV === 'development') {
    // server = "https://zego.life"
    // server = "http://localhost:8080"
    server = window.location.protocol + "//" + window.location.hostname + ":8080";
}

let app_version = "20210102:01"
sessionStorage.setItem("app_version", app_version)

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

document.querySelector("body").classList.add(`theme-${theme}`)
if (theme === "pure-dark") {
    document.querySelector("head").appendChild(document.createTextNode(`<link rel="stylesheet" href="//cdn.jsdelivr.net/gh/Dalgona/neodgm-webfont@1.510/neodgm/style.css">`))
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
serviceWorker.unregister();
