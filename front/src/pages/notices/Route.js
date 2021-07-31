import {Route, Switch} from 'react-router-dom'
import ListNotices from './ListNotices';
import ReadNotice from './ReadNotice';

function Router() {
    return (
        <Switch>
            <Route exact path="/notices" component={ListNotices}/>
            <Route path="/notices/:id" component={ReadNotice}/>
        </Switch>
    )
}

export default Router;
