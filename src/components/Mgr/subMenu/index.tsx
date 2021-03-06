import * as React from 'react'
import { HashRouter, Link } from 'react-router-dom'


import { Layout, Menu, Icon } from 'antd';
const { SubMenu } = Menu;
const { Sider } = Layout;

import { ISubNav } from '@models'
import { IProp } from './models'

let getNavIndex = function (list: ISubNav[], name: string): string {

  if(name === '/') return '0_0'
  for (let i1 in list) {
    let fn = list[i1]
    for (let i2 in fn.options) {
      let sn = fn.options[i2]
      if (name === sn.router) return i1 + '_' + i2
    }
  }
  return '0_0'
}

export default function (prop: IProp) {

  let url = '/' + window.location.href.split('#/')[1]
  let navIndex = getNavIndex(prop.data, url)  
  let defaultOpenKeys = navIndex.split('_')[0].toString()

  return (
    <HashRouter>
      <Sider width={200} style={{ background: '#fff' }}>
        <Menu
          className="menu"
          mode="inline"
          defaultOpenKeys={[defaultOpenKeys]}
          defaultSelectedKeys={[navIndex]}>
          {prop.data.map((subnav, index) => (
            <SubMenu key={index} title={<span><Icon type="user" />{subnav.remark || subnav.name}</span>}>
              {subnav.options.map((option, index2) => (
                <Menu.Item key={index + '_' + index2} >
                  <Link to={option.router}>{option.remark || subnav.name}</Link>
                </Menu.Item>
              ))}
            </SubMenu>
          ))}
        </Menu>
      </Sider>
    </HashRouter>
  )
}