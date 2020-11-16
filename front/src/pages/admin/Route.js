import React from 'react'
import {Route, Switch} from 'react-router-dom'

import NoticeNew from "./NoticeNew"
import PwChange from "./PwChange"
import Main from "./Main"

function Router() {
    return (
        <Switch>
            <Route path="/admin/notice-new" component={NoticeNew}/>
            <Route path="/admin/pw-change" component={PwChange}/>
            <Route path="/admin" exact component={Main}/>

            <Route component={() => <h1 className="page-title">없는 페이지</h1>}/>
        </Switch>
    )
}

export default Router;
