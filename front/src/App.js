import React from 'react'
import {Route, Switch} from 'react-router-dom'
import "shorthandcss/scss/shorthand.scss"
import './App.css';
import './themes/default.css'
import './themes/persona5.css'
import Logo from './components/Logo'
import NotSupported from './components/NotSupported'
import Nav from './components/Nav'
import Main from './pages/Main'
import DietPage from './pages/DietPage'
import Events from './pages/Events'
import Login from './pages/Login'
import Me from './pages/Me'
import Register from './pages/Register'
import About from './pages/About'
import NotFound from './pages/NotFound'

import AddToHome from './pages/help/AddToHome'
import TokenExpired from './pages/help/TokenExpired'

function App() {
    return (
        <>
            <Logo/>
            <div className="site">
                <Switch>
                    <Route exact path="/" component={Main}/>
                    <Route path="/diets" component={DietPage}/>
                    <Route path="/events" component={Events}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/me" component={Me}/>
                    <Route path="/register" component={Register}/>
                    <Route path="/about" component={About}/>

                    <Route path="/help/add-to-home" component={AddToHome}/>
                    <Route path="/help/token-expired" component={TokenExpired}/>

                    <Route component={NotFound}/>
                </Switch>
                <NotSupported/>
            </div>
            <Nav/>
        </>
    )
}

export default App;
