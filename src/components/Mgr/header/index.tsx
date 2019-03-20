import * as React from 'react'

import { Layout, Menu, } from 'antd';
const { Header } = Layout;

import { Prop } from './models'

export default function (prop: Prop) {
  return (
    <Header>
      <div className="logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['0']}
        style={{ lineHeight: '64px' }} >
        {prop.data.map((nav, index) => <Menu.Item key={index} >{nav}</Menu.Item>)}
      </Menu>
    </Header>
  )
}