import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Main from './Main'

function Router() {
    return (
        <Switch>
            <Route path="/talks" component={Main}/>
            <Route component={() => <h1 className="page-title">없는 페이지</h1>}/>
        </Switch>
    )
}

export default Router;
