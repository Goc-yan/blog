import * as React from 'react'
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'

import Mgr from '@components/Mgr'

import { Layout } from 'antd'
const { Content } = Layout

import './style.css'


let nav = [{
    title: 'Blog',
    options: [{
        title: 'subnav1',
        options: [{
            name: '文章管理',
            router: '/blog/article'
        }, {
            name: '标签管理',
            router: '/blog/tag'
        }, {
            name: '分类管理',
            router: '/blog/category'
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
}, {
    title: 'FA',
    options: [{
        title: 'subnav1',
        options: [{
            name: '基金管理',
            router: '/fa/fund'
        }, {
            name: '股票管理',
            router: '/fa/tag'
        }]
    }]
}, {
    title: 'Menu3',
    options: [{
        title: 'subnav1',
        options: [{
            name: '基金管理',
            router: '/fa/fund'
        }, {
            name: '股票管理',
            router: '/fa/tag'
        }]
    }]
}]

let menu = nav.map(data => data.title)
let subMenu = [{
    title: 'subnav1',
    options: [{
        name: '文章管理',
        router: '/blog/article'
    }, {
        name: '标签管理',
        router: '/blog/tag'
    }, {
        name: '分类管理',
        router: '/blog/category'
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
                                            path='/'
                                            render={() => <Redirect to='/blog' />} />
                                        <Route path={`/blog`} component={Mgr.Blog} />
                                        <Route path={`/fa`} component={Mgr.FA} />
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
