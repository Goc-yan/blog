import * as React from 'react'
import { HashRouter as Router, Route, Switch, withRouter, RouteComponentProps } from 'react-router-dom'

import Mgr from '@components/Mgr'

import { getCookie } from '@utils/lib'

import '../../styles/reset.css'

type PathParamsType = {}

type PropsType = RouteComponentProps<PathParamsType> & {}

class App extends React.Component<PropsType> {
    
    componentWillMount() {
        let accountName = getCookie('accountName')
        if (accountName === undefined) this.props.history.push('#/login')
    }

    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/login" component={Mgr.Login}></Route>
                    <Route path="/" component={Mgr.Home}></Route>
                </Switch>
            </Router>
        )
    }
}

export default withRouter(App)