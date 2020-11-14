import React from 'react'
import {Route, Switch} from 'react-router-dom'

import NoticeNew from "./NoticeNew"

function Router() {
    return (
        <Switch>
            <Route path="/admin/notice-new" component={NoticeNew}/>

            <Route component={<h1 className="page-title">없는 페이지</h1>}/>
        </Switch>
    )
}

export default Router;
