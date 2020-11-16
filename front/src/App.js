import React, {lazy, Suspense} from 'react'
import {Route, Switch} from 'react-router-dom'
import "shorthandcss/scss/shorthand.scss"
import './App.css';
import './themes/default.css'
import './themes/gradient.css'
import './themes/persona5.css'
import Logo from './components/Logo'
import NotSupported from './components/NotSupported'
import Nav from './components/Nav'

import {isAdmin} from "./utils/getRoles"
import NoConnection from "./pages/help/NoConnection"

const MainRoute = lazy(() => import("./Route"))
const HelpRoute = lazy(() => import('./pages/help/Route'))
const AdminRoute = isAdmin() ? lazy(() => import('./pages/admin/Route')) : null

function App() {
    return (
        <>
            <Logo/>
            <div className="site">
                <Suspense fallback={<div className="loader"></div>}>
                    <Switch>
                        {
                            isAdmin() ? <Route path="/admin" component={AdminRoute}/> : null
                        }
                        <Route path="/help/no-connection" component={NoConnection}/>
                        <Route path="/help" component={HelpRoute}/>
                        <Route path="/" component={MainRoute}/>
                    </Switch>
                </Suspense>
                <NotSupported/>
            </div>
            <Nav/>
        </>
    )
}

export default App;
