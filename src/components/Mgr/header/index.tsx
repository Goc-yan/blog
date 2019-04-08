import * as React from 'react'
import { Link } from 'react-router-dom'

import { Layout, Menu, } from 'antd';
const { Header } = Layout;

import { Prop } from './models'

import './style.css'

import * as avatar from '@assets/icon/icon_avatar.png'

export default function (prop: Prop) {
  console.log(avatar)
  return (
    <Header>
      <div className="logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        className="float-left"
        defaultSelectedKeys={['0']}
        style={{ lineHeight: '64px' }} >
        {prop.data.map((nav, index) => <Menu.Item key={index} ><Link to={'/' + nav.toLowerCase()}>{nav}</Link></Menu.Item>)}
      </Menu>
      <div className="user">
        <img src={avatar} alt=""/>
        <span className="accont-name">Goc</span>
      </div>
    </Header>
  )
}