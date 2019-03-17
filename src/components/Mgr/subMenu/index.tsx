import * as React from 'react'
import { HashRouter, Link } from 'react-router-dom'
 

import { Layout, Menu, Icon } from 'antd';


const { SubMenu } = Menu;
const { Sider } = Layout;

interface Option {
  router: string
  name: string
}

interface Nav {
  title: string
  options: Option[]
}

interface Prop {
  data: Nav[]
}

export default function (prop: Prop) {
  return (
    <HashRouter>
      
    <Sider width={200} style={{ background: '#fff' }}>
      <Menu
        className="menu"
        mode="inline"
        defaultSelectedKeys={['0']}
        defaultOpenKeys={['0']} >
        {prop.data.map((subnav, index) => (
          <SubMenu key={index} title={<span><Icon type="user" />{subnav.title}</span>}>
            {subnav.options.map((option, index2) => (
              <Menu.Item key={index2} >
                <Link to={option.router}>{option.name}</Link>
              </Menu.Item>
            ))}
          </SubMenu>
        ))}       
      </Menu>
    </Sider>
    </HashRouter>
  )
}