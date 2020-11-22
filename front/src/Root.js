import React from 'react'
import {BrowserRouter} from 'react-router-dom'
import App from './App'

const Root = () => {
    return (
        <BrowserRouter>
            <div className="root-div">
                <App/>
            </div>
        </BrowserRouter>
    )
}

export default Root