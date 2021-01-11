import React, {lazy, Suspense, useEffect} from 'react'
import {Route, Switch, withRouter} from 'react-router-dom'
import axios from 'axios'
import {registerLocale, setDefaultLocale} from "react-datepicker";
import ko from 'date-fns/locale/ko';

// styles
import "./styles/shorthand.scss"
import './styles/App.css';
import './styles/elements.css';

// themes
import './themes/default.css'
import './themes/gradient.css'
import './themes/colors.css'
import './themes/special.css'

// components
import Logo from './components/Logo'
import NotSupported from './components/NotSupported'
import Nav from './components/Nav'

import {isAdmin} from "./utils/getRoles"

const MainRoute = lazy(() => import("./pages/main/Route"))
const Register = lazy(() => import("./pages/main/Register"))
const HelpRoute = lazy(() => import('./pages/help/Route'))
const RadioRoute = lazy(() => import('./pages/radio/Route'))
const AdminRoute = isAdmin() ? lazy(() => import('./pages/admin/Route')) : null

function App({history}) {

    useEffect(() => {
        registerLocale('ko', ko)
        setDefaultLocale("ko")
        axios.interceptors.response.use(res => res, err => {
            if (!err.response) {
                history.push("/no-connection")
            } else if (err.response && err.response.status === 401 && err.response.data.ErrorCode === -101) {
                history.push("/help/token-expired")
            }
            return Promise.reject(err)
        })
    })

    return (
        <>
            <Logo/>
            <div className="site">
                <Suspense fallback={<div className="loader"/>}>
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
