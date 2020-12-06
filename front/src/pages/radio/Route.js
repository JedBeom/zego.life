import React from 'react'
import {Route, Switch} from 'react-router-dom'
import PostStory from './PostStory'

function Router() {
    return (
        <Switch>
            <Route path="/radio/stories/post" component={PostStory}/>
            <Route component={() => <h1 className="page-title">없는 페이지</h1>}/>
        </Switch>
    )
}

export default Router;
