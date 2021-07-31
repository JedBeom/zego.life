import {Route, Switch} from 'react-router-dom'
import Main from './Main'
import CalendarPage from './CalendarPage'
import Events from './Events'
import Login from './Login'
import More from './More'
import About from './About'
import Notice from './Notice'
import Timetable from './Timetable'
import TimetableSetCredit from './TimetableSetCredit'
import Settings from './Settings'

import NotFound from '../NotFound'

function Router() {
    return (
        <Switch>
            <Route exact path="/" component={Main}/>
            <Route path="/calendar" component={CalendarPage}/>
            <Route path="/events" component={Events}/>
            <Route path="/login" component={Login}/>
            <Route path="/more" component={More}/>
            <Route path="/notice" component={Notice}/>
            <Route path="/timetable" exact component={Timetable}/>
            <Route path="/timetable/set-credit" exact component={TimetableSetCredit}/>
            <Route path="/settings" component={Settings}/>
            <Route path="/about" component={About}/>

            <Route component={NotFound}/>
        </Switch>
    )
}

export default Router;
