import * as React from 'react'
import { HashRouter, Router, Route, Link } from 'react-router-dom'

import Mgr from '@components/Mgr'

import { Layout } from 'antd'

const { Content } = Layout


// import 'antd/dist/antd.css'
import './style.css'

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

class App extends React.Component {

    render() {
        return (
            <>
                <Layout tagName="section">
                    <Mgr.Header data={menu} />
                    <Layout tagName="section">
                        <Mgr.SubMenu data={subMenu} />
                        <Layout tagName="section" className="content-wrapper">
                            <Mgr.Breadcrumb data={breadcrumb} />
                            <Content tagName="main" className="content">
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

export default App
