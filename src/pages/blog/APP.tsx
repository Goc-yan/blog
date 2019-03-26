import * as React from 'react'
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import Blog from '@components/blog'

import '../../styles/reset.css'

export default class App extends React.Component {
    render() {
        return (
            <div className="clearfix">
                <Blog.Header />
                <Router>
                    <Switch>
                        {/* <Route
                            exact
                            path='/'
                            render={() => <Redirect to='/' />} /> */}
                        <Route exact path="/" component={Blog.Home}></Route>
                        <Route path="/article" component={Blog.Article}></Route>
                    </Switch>
                </Router>
            </div>
        )
    }
}
