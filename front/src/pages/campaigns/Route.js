import { useState } from 'react';
import {Route, Switch} from 'react-router-dom'

import '../../styles/campaigns.css'

import New from './New'
import Payment from './Payment'
import Pay from './Pay'
import Main from "./Main"

function Router() {
    const [newCmp, setNewCmp] = useState({})

    return <Switch>
        <Route path="/campaigns/new/:id?" render={() => <New cmp={newCmp} setCmp={setNewCmp}/>}/>
        <Route path="/campaigns/:id/payment" render={() => <Payment cmp={newCmp} setCmp={setNewCmp}/>}/>
        <Route path="/campaigns/:id/pay" render={() => <Pay cmp={newCmp} setCmp={setNewCmp}/>}/>
        <Route path="/campaigns" exact component={Main}/>
    </Switch>
}

export default Router;
