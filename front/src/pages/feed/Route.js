import React from 'react'
import {Route, Switch} from 'react-router-dom'
import styled from 'styled-components'
import Main from './Main'
import PostThread from './PostThread'
import ThreadPage from "./ThreadPage"
import About from './About'

import NotFound from '../NotFound'

function Router() {
    return <Wrapper>
        <Switch>
            <Route path="/feed" exact component={Main}/>
            <Route path="/feed/about" component={About}/>
            <Route path="/feed/post" component={PostThread}/>
            <Route path="/feed/:id" component={ThreadPage}/>
            <Route component={NotFound}/>
        </Switch>
    </Wrapper>
}

const Wrapper = styled.div`
& .page {
    font-family: "KyoboHand", var(--font-family) !important;
    font-size: 1.1rem;
    font-weight: normal;
}
`

export default Router;
