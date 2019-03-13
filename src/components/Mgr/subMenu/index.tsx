import * as React from 'react'

import { Layout, Menu, Icon } from 'antd';


const { SubMenu } = Menu;
const { Sider } = Layout;


interface Nav {
  title: string
  options: string[]
}

interface Prop {
  data: Nav[]
}

export default function (prop: Prop) {
  return (
    <Sider width={200} className="bg-fff">
      <Menu
        className="menu"
        mode="inline"
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['0']} >
        {prop.data.map((subnav, index) => (
          <SubMenu key={index} title={<span><Icon type="user" />{subnav.title}</span>}>
            {subnav.options.map((option, index2) => <Menu.Item key={index2}>{option}</Menu.Item>)}
          </SubMenu>
        ))}
      </Menu>
    </Sider>
  )
}