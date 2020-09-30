import React, {Fragment} from 'react'
import {NavLink, Route, Switch} from 'react-router-dom'
import './App.css';
import Logo from './components/Logo'
import NotSupported from './components/NotSupported'
import Nav from './components/Nav'
import Main from './pages/Main'
import DietPage from './pages/DietPage'
import Events from './pages/Events'
import Login from './pages/Login'
import Me from './pages/Me'
import Register from './pages/Register'
import About from './pages/About'
import NotFound from './pages/NotFound'

function App() {
	return (
        <Fragment>
            <Logo/>
            <div className="site">
                <Switch>
                    <Route exact path="/" component={Main}/>
                    <Route path="/diets" component={DietPage}/>
                    <Route path="/events" component={Events}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/me" component={Me}/>
                    <Route path="/register" component={Register}/>
                    <Route path="/about" component={About}/>
                    <Route component={NotFound}/>
                </Switch>
                <NotSupported/>
            </div>
            <footer className="copyright">
                Made with
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className={"icon footer-icon"}>
                    <path
                        d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"/>
                </svg>
                by
                <NavLink to="/about">06+17+19</NavLink>
                <p className="gray-light dark-mode-explain"></p>
            </footer>
            <Nav/>
        </Fragment>
    )
}

export default App;
