import * as React from 'react'
import { Row, Col } from 'antd';
import "antd/dist/antd.css";

import './style.css'

import { $get } from '@utils/ajax'

// import '../../../models/index'

interface Articles {
  id: number;
  title: string;
}

interface ResData {
  errCode: number;
  errMsg?: string;
  data: Articles[];
}

interface State {
  list: Articles[];
}

export default class Home extends React.Component<any, State> {

  constructor(prop: any) {
    super(prop)

    this.state = {
      list: []
    }

  }

  getData() {

    let _this = this
    $get('/api/articles/list', function (resData: ResData): void {

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
