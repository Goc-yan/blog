import * as React from 'react'

import Mgr from '@components/Mgr'

import { Layout } from 'antd'

const { Content } = Layout


import 'antd/dist/antd.css'
import './style.css'

let menu = ['Home', 'Menu2', 'Menu3']
let subMenu = [{
    title: 'subnav1',
    options: ['option1', 'option2', 'option3']
}, {
    title: 'subnav2',
    options: ['option1', 'option2']
}, {
    title: 'subnav3',
    options: ['option1', 'option2', 'option3', 'option4']
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
                                <Mgr.Articles />
                            </Content>
                        </Layout>
                    </Layout>
                </Layout>
            </>
        )
    }
}

export default App
