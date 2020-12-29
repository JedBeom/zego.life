import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Main from './Main'
import DietPage from './DietPage'
import Events from './Events'
import Login from './Login'
import More from './More'
import About from './About'
import Notice from './Notice'
import Timetable from './Timetable'
import NoConnection from './NoConnection'
import NotFound from './NotFound'

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
