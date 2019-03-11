import * as React from 'react'
import axios from 'axios'
import { Row, Col } from 'antd';
import "antd/dist/antd.css";

import './style.css'

// import untils from '../../../untils';

export default class Home extends React.Component {

  constructor(prop:any) {
    super(prop)

    this.state = {
      list: []
    }

  }

  getData() {

    let _this = this

    axios.get('/api/articles/list').then(function(resData:any) {
      
      console.log(resData)
      if (resData.errCode === 0) {

        _this.setState({
          list: [...resData.data]
        })
      } else {
        console.log(resData.errMsg)
      }


    })
  }

  componentDidMount() {
    console.log('componentDidMount')
    this.getData()
  }

  render() {
    return (
      <div className="body">
        <Row>
          <Col span={20} offset={2}>
            <ul className="list-wrapper">
              {/* {this.state.list.map((data, index) => <li key={index}><a href="#">{data.title}</a></li>)} */}
            </ul>
          </Col>
        </Row>
      </div>
    )
  }
}
