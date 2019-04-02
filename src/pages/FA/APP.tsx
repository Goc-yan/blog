import * as React from 'react'
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import FA from '@components/FA'

import '../../styles/reset.css'

export default class App extends React.Component {
    render() {
        return (
            <div className="clearfix">
                <FA.Header />
                <Router>
                    <Switch>
                        <Route exact path="/" component={FA.Home}></Route>
                        {/* <Route path="/article" component={Blog.Article}></Route> */}
                    </Switch>
                </Router>
            </div>
        )
    }
}
