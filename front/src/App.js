import { lazy, Suspense, useEffect } from 'react';
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
import NotSupported from './components/NotSupported'
import Nav from './components/Nav'

import {isAdmin} from "./utils/getRoles"

import NoConnection from './pages/main/NoConnection'
import styled from 'styled-components';
import Loading from './components/ui/Loading';

const MainRoute = lazy(() => import("./pages/main/Route"))
const Register = lazy(() => import("./pages/main/Register"))
const HelpRoute = lazy(() => import('./pages/help/Route'))
const Bookmarks = lazy(() => import("./pages/bookmarks/Main"))
const CampaignsRoute = lazy(() => import('./pages/campaigns/Route'))
const AdminRoute = isAdmin() ? lazy(() => import('./pages/admin/Route')) : null

registerLocale('ko', ko)
setDefaultLocale("ko")

function App({history}) {

    useEffect(() => {
        axios.interceptors.response.use(res => res, err => {
            if (!err.response) {
                history.push("/no-connection")
            } else if (err.response && err.response.status === 401 && err.response.data.ErrorCode === -101) {
                history.push("/help/token-expired")
            }
            return Promise.reject(err)
        })
    }, [])

    return (
        <>
            <Site>
                <Suspense fallback={<Loading visible={true}/>}>
                    <Switch>
                        {
                            isAdmin() ? <Route path="/admin" component={AdminRoute}/> : null
                        }
                        <Route path="/help" component={HelpRoute}/>
                        <Route path="/campaigns" component={CampaignsRoute}/>
                        <Route path="/bookmarks" component={Bookmarks}/>
                        <Route path="/register" component={Register}/>
                        <Route path="/no-connection" component={NoConnection}/>
                        <Route path="/" component={MainRoute}/>
                    </Switch>
                </Suspense>
                <NotSupported/>
            </Site>
            <Nav/>
        </>
    )
}

const Site = styled.div`
color: var(--site-text-color);
padding-bottom: 10em;
padding-top: calc(env(safe-area-inset-top) + 1em);
`

export default withRouter(App);
