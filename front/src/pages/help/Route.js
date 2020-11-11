import React, {lazy, Suspense} from 'react'
import {Route, Switch} from 'react-router-dom'

const AddToHome = lazy(() => import("./AddToHome"))
const TokenExpired = lazy(() => import("./TokenExpired"))
const SlotFilling = lazy(() => import("./SlotFilling"))
const Feedback = lazy(() => import("./Feedback"))

function HelpRoute() {
    return (
        <Suspense fallback={null}>
            <Switch>
                <Route path="/help/add-to-home" component={AddToHome}/>
                <Route path="/help/token-expired" component={TokenExpired}/>
                <Route path="/help/slot-filling" component={SlotFilling}/>
                <Route path="/help/feedback" component={Feedback}/>
                <Route component={() => <h1 className="page-title">없는 페이지</h1>}/>
            </Switch>
        </Suspense>
    )
}

export default HelpRoute