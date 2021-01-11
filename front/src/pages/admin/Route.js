import React from 'react'
import {Route, Switch} from 'react-router-dom'

import NoticeNew from "./NoticeNew"
import Feedbacks from "./Feedbacks"
import UsersAll from "./UsersAll"
import Main from "./Main"

function Router() {
    return (
        <Switch>
            <Route path="/admin/notice-new/:id?" component={NoticeNew}/>
            <Route path="/admin/feedbacks" component={Feedbacks}/>
            <Route path="/admin/users-all" component={UsersAll}/>
            <Route path="/admin" exact component={Main}/>

            <Route component={() => <h1 className="page-title">없는 페이지</h1>}/>
        </Switch>
    )
}

export default Router;
