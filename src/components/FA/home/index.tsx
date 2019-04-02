import * as React from 'react'

import { Link } from 'react-router-dom'

import { Table, Divider, Tag } from 'antd'

import './style.css'

// AJAX
import { $get } from '@utils/ajax'

// 接口
import { IResArticles, IState } from './models'

const columns = [{
  title: '类别',
  dataIndex: 'category',
}, {
  title: '是否持有',
  dataIndex: 'isHold',
}, {
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
}, {
  title: '收益',
  key: 'income',
}, {
  title: '年化收益',
  key: 'annualizedIncome',
}]

const data:any = []


export default class Home extends React.Component<object, IState> {

  constructor(prop: object) {
    super(prop)

    this.state = {
      list: []
    }
  }

  getData() {

    let _this = this
    $get('/api/articles', function (resData: IResArticles): void {

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
    return (
      <div className="body">
        <Table columns={columns} dataSource={data} />
      </div>
    )
  }
}
