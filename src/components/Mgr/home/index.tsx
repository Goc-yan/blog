import * as React from 'react'
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'

import Mgr from '@components/Mgr'

import { Layout } from 'antd'
const { Content } = Layout

import './style.css'


let menu = ['Home', 'Menu2', 'Menu3']
let subMenu = [{
    title: 'subnav1',
    options: [{
        name: '文章管理',
        router: '/home/article'
    }, {
        name: '标签管理',
        router: '/home/tag'
    }]
}, {
    title: 'subnav2',
    options: [{
        name: 'option1',
        router: '/'
    }, {
        name: 'option2',
        router: '/'
    }]
}, {
    title: 'subnav3',
    options: [{
        name: 'option3',
        router: '/'
    }, {
        name: 'option4',
        router: '/'
    }]
}]
let breadcrumb = ['Home', 'List', 'App']

export default class Component extends React.Component<any> {

    constructor(prop: any) {
        super(prop)
    }

    render() {
        return (
            <>
                <Layout>
                    <Mgr.Header data={menu} />
                    <Layout>
                        <Mgr.SubMenu data={subMenu} />
                        <Layout className="content-wrapper">
                            <Mgr.Breadcrumb data={breadcrumb} />
                            <Content className="content">
                                <HashRouter>
                                    <Switch>
                                        <Route
                                            exact
                                            path={`${this.props.match.path}/`}
                                            render={() => <Redirect to={`${this.props.match.path}/article`} />}
                                        />
                                        <Route exact path={`${this.props.match.path}/article`} component={Mgr.Articles} />
                                        <Route exact path={`${this.props.match.path}/tag`} component={Mgr.Tag} />                                     */}
                                    </Switch>
                                </HashRouter>
                            </Content>
                        </Layout>
                    </Layout>
                </Layout>
            </>
        )
    }
}
