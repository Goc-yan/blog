import * as React from 'react'
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import Mgr from '@components/Mgr'


import '../../styles/reset.css'


export default class App extends React.Component {

    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/" component={Mgr.Home}></Route>
                    <Route path="/login" component={Mgr.Login}></Route>
                </Switch>
            </Router>
        )
    }
}
