import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Main from './pages/Main'
import DietPage from './pages/DietPage'
import Events from './pages/Events'
import Login from './pages/Login'
import Me from './pages/Me'
import Register from './pages/Register'
import About from './pages/About'
import Notice from './pages/Notice'
import Timetable from './pages/Timetable'
import NotFound from './pages/NotFound'

function Router() {
    return (
        <Switch>
            <Route exact path="/" component={Main}/>
            <Route path="/diets" component={DietPage}/>
            <Route path="/events" component={Events}/>
            <Route path="/login" component={Login}/>
            <Route path="/me" component={Me}/>
            <Route path="/register" component={Register}/>
            <Route path="/notice" component={Notice}/>
            <Route path="/timetable" component={Timetable}/>
            <Route path="/about" component={About}/>

            <Route component={NotFound}/>
        </Switch>
    )
}

export default Router;
