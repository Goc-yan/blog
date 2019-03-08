import React, { Component } from 'react'
import axios from 'axios'

import { Row, Col } from 'antd';
import "antd/dist/antd.css";

import './style.css'

class Header extends Component {

  constructor(prop) {
    super(prop)

    this.state = {
      list: []
    }

  }

  getData() {
    console.log('test')

    let _this = this

    var url = '//192.168.1.13:3000/api/articles/list'
    axios.get(url).then(function(data) {
      _this.setState({
        list: [...data.data]
      })
    })
  }

  componentDidMount() {
    this.getData()
    console.log('componentDidMount')
  }

  render() {
    return (
      <div className="body">
        <Row>
          <Col span={20} offset={2}>
            <ul className="list-wrapper">
              {this.state.list.map((data, index) => <li key={index}><a href="#">{data.title}</a></li>)}
              <li><a href="#">webpack简易上手指南</a></li>
              <li><a href="#">谈谈跨域</a></li>
            </ul>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Header