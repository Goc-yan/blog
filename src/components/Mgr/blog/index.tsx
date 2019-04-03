import * as React from 'react'
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'

import Mgr from '@components/Mgr'

import './style.css'

export default class Component extends React.Component<any> {

    constructor(prop: any) {
        super(prop)
    }

    render() {
        return (
            <HashRouter>
                <Switch>
                    <Route
                        exact
                        path={`${this.props.match.path}/`}
                        render={() => <Redirect to={`${this.props.match.path}/article`} />}
                    />
                    <Route path={`${this.props.match.path}/article`} component={Mgr.Articles} />
                    <Route exact path={`${this.props.match.path}/tag`} component={Mgr.Tag} />
                    <Route exact path={`${this.props.match.path}/category`} component={Mgr.Category} />
                </Switch>
            </HashRouter>            
        )
    }
}
