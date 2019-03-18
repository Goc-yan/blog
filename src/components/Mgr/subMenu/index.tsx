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


let getNavIndex = function (list: Nav[], name: string) {
  for (let i1 in list) {
    let fn = list[i1]
    for (let i2 in fn.options) {
      let sn = fn.options[i2]
      if (name === sn.router) return i2
    }
  }
}

export default function (prop: Prop) {

  let url = '/' + window.location.href.split('#/')[1]
  let navIndex = getNavIndex(prop.data, url)

  return (
    <HashRouter>
      <Sider width={200} style={{ background: '#fff' }}>
        <Menu
          className="menu"
          mode="inline"
          defaultOpenKeys={['0']} 
          defaultSelectedKeys={[navIndex]}>
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