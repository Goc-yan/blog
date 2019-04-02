import * as React from 'react'

import { Link } from 'react-router-dom'

import { Table, Divider, Tag } from 'antd'

import './style.css'

// AJAX
import { $get } from '@utils/ajax'

// 接口
import { IResArticles, IState } from './models'

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
}, {
  title: '收益',
  key: 'income',
}, {
  title: '年化收益',
  key: 'annualizedIncome',
}]

const data:any = []

const getData = (data: string) => {
  let arr: string[]
  arr = data.split('~')
  return {
    name: arr[1],
    code: arr[2],
    netWorth: '',
    valuation: '',
    income: '',
    annualizedIncome: '',
  }
}


export default class Home extends React.Component<object, IState> {

  constructor(prop: object) {
    super(prop)

    this.state = {
      // codes: [
      //   'sh600519',
      //   'sz161810',
      //   // 'sh519300'
      // ],
      list: []
    }
  }

  getData() {

    let _this = this
    $get('/api/funds', function (resData: any): void {

      console.log(resData)
      
      // var res: IData
      // var list: IData[]

      // list = resData.split(';\n').filter((str:string) => str.length > 0).map(getData)
      // console.log(list)

      // _this.setState({
      //   list: [...list]
      // })

      // resData.errCode === 0
      //   ? _this.setState({
      //     list: [...resData.data]
      //   })
      //   : console.log(resData.errMsg)
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
