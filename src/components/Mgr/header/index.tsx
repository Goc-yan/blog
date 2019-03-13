import * as React from 'react'

import { Layout, Menu, } from 'antd';

const { Header } = Layout;

interface Prop {
  data: string[]
}

export default function (prop: Prop) {
  return (
    <Header tagName="header">
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