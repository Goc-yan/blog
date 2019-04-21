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
                        render={() => <Redirect to={`${this.props.match.path}/fund`} />}
                    />
                    <Route path={`${this.props.match.path}/fund`} component={Mgr.Fund} />
                    <Route path={`${this.props.match.path}/stock`} component={Mgr.Articles} />
                </Switch>
            </HashRouter>            
        )
    }
}
