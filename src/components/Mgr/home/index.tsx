import * as React from 'react'
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'

import Mgr from '@components/Mgr'

import { Layout } from 'antd'
const { Content } = Layout

import { INav, ISubNav } from '@models'
import { IState } from './models'

import { getCookie } from '@utils/lib'

import './style.css'

/** 获取面包屑导航 */
let getBreadcrumb = function (data: INav[]) {

    let urlParams = location.href.split('#/')[1]

    /** 一级菜单 */
    let mainMenu: string = ''
    /** 二级菜单 */
    let secondMenu: string = ''
    /** 三级菜单 */
    let lastMenu: string = ''
    
    
    if (urlParams && urlParams.split('/').length === 2) {

        let subMenu
        [mainMenu, lastMenu] = urlParams.split('/')
        subMenu = data.filter(menu => menu.name === mainMenu)[0]
        secondMenu = subMenu.options.filter(subMenu => subMenu.options.filter(op => op.name === lastMenu).length === 1)[0].name
    } else {
        mainMenu = data[0].name
        secondMenu = data[0].options[0].name
        lastMenu = data[0].options[0].options[0].name
    }
    return [mainMenu, secondMenu, lastMenu]
}

let menuData: INav[] = [{
    name: 'blog',
    remark: 'Blog',
    options: [{
        name: 'subnav1',
        remark: '',
        options: [{
            name: 'article',
            remark: '文章管理',
            router: '/blog/article'
        }, {
            name: 'tag',
            remark: '标签管理',
            router: '/blog/tag'
        }, {
            name: 'category',
            remark: '分类管理',
            router: '/blog/category'
        }]
    }, {
        name: 'subnav2',
        remark: '',
        options: [{
            name: 'option1',
            remark: '',
            router: '/'
        }, {
            name: 'option2',
            remark: '',
            router: '/'
        }]
    }, {
        name: 'subnav3',
        remark: '',
        options: [{
            name: 'option3',
            remark: '',
            router: '/'
        }, {
            name: 'option4',
            remark: '',
            router: '/'
        }]
    }]
}, {
    name: 'fa',
    remark: 'FA',
    options: [{
        name: 'subnav1',
        remark: '',
        options: [{
            name: 'option1',
            remark: '',
            router: '/'
        }, {
            name: 'option2',
            remark: '',
            router: '/'
        }]
    }, {
        name: 'subnav2',
        remark: '',
        options: [{
            name: 'fund',
            remark: '基金管理',
            router: '/fa/fund'
        }, {
            name: 'stock',
            remark: '股票管理',
            router: '/fa/stock'
        }]
    }]
}, {
    name: 'menu3',
    remark: 'Menu3',
    options: [{
        name: 'subnav1',
        remark: 'Menu3',
        options: [{
            name: 'other',
            remark: '其他',
            router: '/fa/other'
        }, {
            name: 'other',
            remark: '其他',
            router: '/fa/other'
        }]
    }]
}]

/** 获取面包屑导航 */
let breadcrumb: string[] = getBreadcrumb(menuData)
/** 菜单 */
let menu: string[] = menuData.map(menu => menu.remark || menu.name)
/** 二级菜单 */
let subMenu: ISubNav[] = menuData.filter(menu => menu.name === breadcrumb[0])[0].options

export default class Component extends React.Component<any, IState> {


    constructor(prop: any) {
        super(prop)
    }

    componentWillMount() {

        
        console.log('subMenu: 切换主导航, 副导航UI不更新')

        this.setState({
            accountName: getCookie('name')
        })
    }

    componentWillReceiveProps() {
        breadcrumb = getBreadcrumb(menuData)
        subMenu = menuData.filter(menu => menu.name === breadcrumb[0])[0].options
    }

    render() {

        let { accountName } = this.state
        return (
            <>
                <Layout>
                    <Mgr.Header data={menu} accountName={accountName} mainMenu={breadcrumb[0]} />
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
                                            render={() => <Redirect to={'/blog'} />} />
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
