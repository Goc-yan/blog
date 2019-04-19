import * as React from 'react'
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'

import Mgr from '@components/Mgr'

import { Layout } from 'antd'
const { Content } = Layout

import { iState } from './models'

import { getCookie } from '@utils/lib'

import './style.css'


/** 获取一级导航 */
let getNavType = function () {

    let url = location.href
    if (url.split('#/') && url.split('#/')[1]) {
        let type = url.split('#/')[1].split('/')[0]
        return type.replace(/^(\w)(\w*)/, function ($0, $1, $2) {
            return $1.toUpperCase() + $2.toLowerCase();
        })
    }
}

let nav = [{
    name: 'Blog',
    title: 'blog',
    options: [{
        title: 'subnav1',
        options: [{
            name: '文章管理',
            title: 'article',
            router: '/blog/article'
        }, {
            name: '标签管理',
            title: 'tag',
            router: '/blog/tag'
        }, {
            name: '分类管理',
            title: 'category',
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
    name: 'FA',
    title: 'fa',
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

/** 一级导航 */
let navType = getNavType()

let menu = nav.map(data => data.name || data.title)
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

subMenu = nav.filter(nav => nav.title === navType)[0].options

let breadcrumb = [navType, 'List', 'App']

export default class Component extends React.Component<any, iState> {


    constructor(prop: any) {
        super(prop)
    }

    componentWillMount() {

        this.setState({
            accountName: getCookie('accountName')
        })
    }

    render() {

        let { accountName } = this.state
        return (
            <>
                <Layout>
                    <Mgr.Header data={menu} accountName={accountName} />
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
                                            render={() => <Redirect to={'/' + navType} />} />
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
