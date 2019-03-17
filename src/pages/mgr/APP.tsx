import * as React from 'react'
import { HashRouter, Route } from 'react-router-dom'

import Mgr from '@components/Mgr'

import { Layout } from 'antd'


import '../../styles/reset.css'
import './style.css'

const { Content } = Layout

let menu = ['Home', 'Menu2', 'Menu3']
let subMenu = [{
    title: 'subnav1',
    options: [{
        name: '文章管理',
        router: '/'
    }, {
        name: '标签管理',
        router: '/tag'
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

export default class App extends React.Component {

    render() {
        console.log('hello mgr')
        return (
            <>
                <Layout>
                    <Mgr.Header data={menu} />
                    <Layout>
                        <Mgr.SubMenu data={subMenu} />
                        <Layout className="content-wrapper">
                            <Mgr.Breadcrumb data={breadcrumb} />
                            <Content  className="content">
                                <HashRouter>
                                    <>
                                        <Route path="/" exact={true} component={Mgr.Articles}></Route>
                                        <Route path="/tag" component={Mgr.Tag}></Route>
                                    </>
                                </HashRouter>
                            </Content>
                        </Layout>
                    </Layout>
                </Layout>
            </>
        )
    }
}
