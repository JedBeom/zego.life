import React, {lazy, Suspense, useEffect} from 'react'
import {Route, Switch, withRouter} from 'react-router-dom'
import axios from 'axios'
import "shorthandcss/scss/shorthand.scss"
import './App.css';
import './themes/default.css'
import './themes/gradient.css'
import './themes/persona5.css'
import './themes/special.css'
import Logo from './components/Logo'
import NotSupported from './components/NotSupported'
import Nav from './components/Nav'

import {isAdmin} from "./utils/getRoles"

const MainRoute = lazy(() => import("./Route"))
const Register = lazy(() => import("./pages/Register"))
const HelpRoute = lazy(() => import('./pages/help/Route'))
const RadioRoute = lazy(() => import('./pages/radio/Route'))
const AdminRoute = isAdmin() ? lazy(() => import('./pages/admin/Route')) : null

function App({history}) {

    useEffect(() => {
        axios.interceptors.response.use(res => res, err => {
            if (!err.response) {
                history.push("/no-connection")
            } else if (err.response && err.response.status === 401 && window.location.pathname !== "/login" && window.location.pathname !== "/register") {
                history.push("/help/token-expired")
            }
            return Promise.reject(err)
        })
    })

    return (
        <>
            <Logo/>
            <div className="site">
                <Suspense fallback={<div className="loader"></div>}>
                    <Switch>
                        {
                            isAdmin() ? <Route path="/admin" component={AdminRoute}/> : null
                        }
                        <Route path="/help" component={HelpRoute}/>
                        <Route path="/radio" component={RadioRoute}/>
                        <Route path="/register" component={Register}/>
                        <Route path="/" component={MainRoute}/>
                    </Switch>
                </Suspense>
                <NotSupported/>
            </div>
            <Nav/>
        </>
    )
}

export default withRouter(App);
