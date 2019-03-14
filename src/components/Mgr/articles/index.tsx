import * as React from 'react'

import Mgr from '@components/Mgr'

import { TableColumn, ResData, Article } from '@models'
import { $get, $post } from '@utils/ajax'

import { Row, Col, Button, Icon, Table } from 'antd'

import "antd/dist/antd.css"
import './style.css'

interface State {
  data: Article[];
  selectedRowKeys: number[];
  columns: TableColumn[];
}

interface resArticles extends ResData {
  data: Article[]
}

class Header extends React.Component<object, State> {

  constructor(prop: object) {
    super(prop)

    this.state = {
      data: [],
      selectedRowKeys: [],
      columns: [{
        title: 'ID',
        dataIndex: 'id',
        width: 10,
      }, {
        title: '标题',
        dataIndex: 'title',
        width: 800,
      }, {
        title: 'Action',
        key: 'operation',
        width: 50,
        render: (text: string, record: string) => (
          <span>
            <a href="javascript:;">editor</a>
          </span>
        ),
      }],
    }

    this.onSelectChange = this.onSelectChange.bind(this);
    this.delete = this.delete.bind(this);
  }

  getData() {

    let _this = this
    $get('/api/articles/list', function (resData: resArticles): void {
      _this.setState({
        data: [...resData.data]
      })
    })
  }

  delete() {

    let _this = this
    let options = {
      data: this.state.selectedRowKeys
    }

    $post('/api/articles/delete', options, function (resData: ResData): void {
      console.log(resData);
    })
  }

  onSelectChange(selectedRowKeys: number[]): void {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  }

  componentDidMount() {
    console.log('componentDidMount')
    this.getData()
  }

  render() {

    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };

    return (
      <div className="body">
        <div className="btn-group">
          <Button
            className="float-right margin-left-20"
            type="danger"
            disabled={this.state.selectedRowKeys.length === 0}
            onClick={this.delete} >
            <Icon type="delete" />
            删除
              </Button>
          <Button className="float-right" type="primary"><Icon type="plus" />新增</Button>
        </div>
        {/* <Table rowKey={record => record.id.toString()}
          rowSelection={rowSelection}
          columns={this.state.columns}
          dataSource={this.state.data} /> */}
        <Mgr.Editor />
      </div>
    )
  }
}

export default Header