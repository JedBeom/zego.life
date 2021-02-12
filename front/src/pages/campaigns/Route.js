import React, {useState} from 'react'
import {Route, Switch} from 'react-router-dom'

import '../../styles/campaigns.css'

import New from './New'
import Payment from './Payment'
import Pay from './Pay'
import Main from "./Main"

function Router() {
    const [newCmp, setNewCmp] = useState({})

    return <div className="campaigns-site">
        <Switch>
            <Route path="/campaigns/new/:id?" render={() => <New cmp={newCmp} setCmp={setNewCmp}/>}/>
            <Route path="/campaigns/:id/payment" render={() => <Payment cmp={newCmp} setCmp={setNewCmp}/>}/>
            <Route path="/campaigns/:id/pay" render={() => <Pay cmp={newCmp} setCmp={setNewCmp}/>}/>
            <Route path="/campaigns" exact component={Main}/>
        </Switch>
    </div>
}

export default Router;
