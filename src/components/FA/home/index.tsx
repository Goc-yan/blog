import * as React from 'react'

import { Link } from 'react-router-dom'

import { Table } from 'antd'

import './style.css'

// AJAX
import { $get } from '@utils/ajax'

// 接口
import { IState } from './models'

const columns = [{
//   title: '类别',
//   dataIndex: 'category',
// }, {
//   title: '是否持有',
//   dataIndex: 'isHold',
// }, {
  title: '代码',
  dataIndex: 'code',
}, {
  title: '名称',
  dataIndex: 'name',
}, {
  title: '净值',
  dataIndex: 'netWorth',
}, {
  title: '估值',
  dataIndex: 'valuation',
  render: (text: any, record: any) => {
    return (
      <span>
        <span>{record.valuation}</span>
        <span className={record.gszzl > 0 ? 'profit' : 'loss'}>{record.gszzl}</span>
      </span>
    )
  },
}, {
  title: '收益',
  key: 'income',
}, {
  title: '年化收益',
  key: 'annualizedIncome',
}]


export default class Home extends React.Component<object, IState> {

  constructor(prop: object) {
    super(prop)

    this.state = {
      list: []
    }
  }

  getData() {

    let _this = this
    $get('/api/funds', function (resData: any): void {
      resData.errCode === 0
        ? _this.setState({
          list: [...resData.data]
        })
        : console.log(resData.errMsg)
    })
  }

  componentDidMount() {
    this.getData()
  }

  render() {
    let { list } = this.state
    return (
      <div className="body">
        <Table columns={columns} dataSource={list} />
      </div>
    )
  }
}
