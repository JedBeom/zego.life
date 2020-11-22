import React from 'react';
import ReactDOM from 'react-dom';
import Root from './Root';
import * as serviceWorker from './serviceWorker';
import axios from 'axios'

let server = window.location.protocol + "//" + window.location.hostname + ":" + window.location.port;

if (process.env.NODE_ENV === 'development') {
    // server = "https://zego.life"
    // server = "http://localhost:8080"
    server = window.location.protocol + "//" + window.location.hostname + ":8080";
}

axios.defaults.baseURL = server + "/api/v1/"
axios.interceptors.request.use(config => {
    let token = localStorage.getItem("token")
    if (token != null) {
        config.headers.common["Heartbeat-Overheat"] = token
    }
    return config
})
axios.interceptors.response.use(res => res, err => {
    if (!err.response) {
        alert("서버와 연결할 수 없습니다. 데이터나 와이파이를 켜주세요. 학교 와이파이를 사용 중이라면 새로고침을 해주세요.")
    } else if (err.response && err.response.status === 401 && window.location.pathname !== "/login" && window.location.pathname !== "/register") {
        window.location = "/help/token-expired"
    }
    return Promise.reject(err)
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
