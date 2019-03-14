import * as React from 'react'
import { Row, Col } from 'antd';
import "antd/dist/antd.css";

import './style.css'

import { $get } from '@utils/ajax'

import { Article, ResData } from '@models'

interface ResArticles extends ResData {
  data: Article[];
}

interface State {
  list: Article[];
}

export default class Home extends React.Component<object, State> {

  constructor(prop: object) {
    super(prop)

    this.state = {
      list: []
    }

  }

  getData() {

    let _this = this
    $get('/api/articles/list', function (resData: ResArticles): void {

      resData.errCode === 0
        ? _this.setState({
          list: [...resData.data]
        })
        : console.log(resData.errMsg)
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
              {this.state.list.map((data, index) => <li key={index}><a href="#">{data.title}</a></li>)}
            </ul>
          </Col>
        </Row>
      </div>
    )
  }
}