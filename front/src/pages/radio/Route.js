import React from 'react'
import {Route, Switch} from 'react-router-dom'
import PostStory from './PostStory'
import ListStory from './ListStory'

import {isAdmin, isThat} from '../../utils/getRoles'

function Router() {
    return (
        <Switch>
            <Route path="/radio/stories/post" component={PostStory}/>
            {isThat("radio") || isAdmin() ? <Route path="/radio/stories" exact component={ListStory}/> : null}
            <Route component={() => <h1 className="page-title">없는 페이지</h1>}/>
        </Switch>
    )
}

export default Router;
