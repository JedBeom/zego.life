import React from 'react'
import {Route, Switch} from 'react-router-dom'
import PostStory from './PostStory'
import ListStory from './ListStory'

import {isAdmin, isThat} from '../../utils/getRoles'

import NotFound from '../NotFound'

function Router() {
    return (
        <Switch>
            <Route path="/radio/stories/post" component={PostStory}/>
            {isThat("radio") || isAdmin() ? <Route path="/radio/stories" exact component={ListStory}/> : null}
            <Route component={NotFound}/>
        </Switch>
    )
}

export default Router;
