import React from 'react'
import {Route, Switch} from 'react-router-dom'

import AddToHome from "./AddToHome"
import TokenExpired from "./TokenExpired"
import SlotFilling from "./SlotFilling"
import Feedback from "./Feedback"

function HelpRoute() {
    return (
        <Switch>
            <Route path="/help/add-to-home" component={AddToHome}/>
            <Route path="/help/token-expired" component={TokenExpired}/>
            <Route path="/help/slot-filling" component={SlotFilling}/>
            <Route path="/help/feedback" component={Feedback}/>
            <Route component={() => <h1 className="page-title">없는 페이지</h1>}/>
        </Switch>
    )
}

export default HelpRoute