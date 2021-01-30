import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Main from './Main'
import Site from './Site'

function Router() {
    return (
        <Switch>
            <Route path="/fes" exact component={Main}/>
            <Route path="/fes/site" component={Site}/>
        </Switch>
    )
}

export default Router;
