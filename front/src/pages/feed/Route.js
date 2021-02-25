import React from 'react'
import {Route, Switch} from 'react-router-dom'
import styled from 'styled-components'
import Main from './Main'
import PostThread from './PostThread'
import ThreadPage from "./ThreadPage"
import About from './About'

function Router() {
    return <Wrapper>
        <Switch>
            <Route path="/feed" exact component={Main}/>
            <Route path="/feed/about" component={About}/>
            <Route path="/feed/post" component={PostThread}/>
            <Route path="/feed/:id" component={ThreadPage}/>
            <Route component={() => <h1 className="page-title">없는 페이지</h1>}/>
        </Switch>
    </Wrapper>
}

const Wrapper = styled.div`
font-family: "InkLipquid", var(--font-family) !important;
font-weight: normal;
font-size: 1.25rem;

& * {
    font-family: "InkLipquid", var(--font-family) !important;
}
`

export default Router;
