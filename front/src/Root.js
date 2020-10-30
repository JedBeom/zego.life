import React from 'react'
import {BrowserRouter} from 'react-router-dom'
import App from './App'

const theme = localStorage.getItem("theme")

const Root = () => {
    return (
        <BrowserRouter>
            <div className={`root-div theme-${theme}`}>
                <App/>
            </div>
        </BrowserRouter>
    )
}

export default Root