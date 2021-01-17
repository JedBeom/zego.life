import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Main from './Main'
import PostThread from './PostThread'
import ThreadPage from "./ThreadPage"

function Router() {
    return (
        <Switch>
            <Route path="/talks" exact component={Main}/>
            <Route path="/talks/post" component={PostThread}/>
            <Route path="/talks/:id" component={ThreadPage}/>
            <Route component={() => <h1 className="page-title">없는 페이지</h1>}/>
        </Switch>
    )
}

export default Router;
