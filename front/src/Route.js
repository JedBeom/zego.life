import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Main from './pages/Main'
import DietPage from './pages/DietPage'
import Events from './pages/Events'
import Login from './pages/Login'
import More from './pages/More'
import About from './pages/About'
import Notice from './pages/Notice'
import Timetable from './pages/Timetable'
import NoConnection from './pages/NoConnection'
import NotFound from './pages/NotFound'

function Router() {
    return (
        <Switch>
            <Route exact path="/" component={Main}/>
            <Route path="/diets" component={DietPage}/>
            <Route path="/events" component={Events}/>
            <Route path="/login" component={Login}/>
            <Route path="/more" component={More}/>
            <Route path="/notice" component={Notice}/>
            <Route path="/timetable" component={Timetable}/>
            <Route path="/about" component={About}/>

            <Route path="/no-connection" component={NoConnection}/>
            <Route component={NotFound}/>
        </Switch>
    )
}

export default Router;
