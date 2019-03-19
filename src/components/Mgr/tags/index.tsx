import * as React from 'react'


import { TableColumn, ResData, Article } from '@models'
import { $get, $post } from '@utils/ajax'

import { Modal, Button, Icon, Table } from 'antd'

import './style.css'

interface State {
  data: Article[]
  selectedRowKeys: number[]
  columns: TableColumn[]
  loading: boolean
  visible: boolean
  submitting: boolean
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
        title: '标签名称',
        dataIndex: 'title',
        width: 800,
      }, {
        title: '操作',
        key: 'operation',
        width: 100,
        render: (text: string, record: string) => (
          <span>
            <a href="javascript:;">编辑</a>
          </span>
        ),
      }],
      loading: false,
      visible: false,
      submitting: false,
    }

    this.onSelectChange = this.onSelectChange.bind(this)
    this.delete = this.delete.bind(this)
    this.showModal = this.showModal.bind(this)
    this.handleOk = this.handleOk.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
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
      console.log(resData)
    })
  }

  onSelectChange(selectedRowKeys: number[]): void {
    console.log('selectedRowKeys changed: ', selectedRowKeys)
    this.setState({ selectedRowKeys })
  }

  showModal = () => {
    this.setState({
      visible: true,
    })
  }

  handleOk = () => {
    this.setState({ loading: true, submitting: true  })
    setTimeout(() => {
      this.setState({ 
        loading: false, 
        visible: false,
        submitting: false 
      })
    }, 3000)
  }

  handleCancel = () => {
    this.setState({ visible: false })
  }

  componentDidMount() {
    this.getData()
  }

  render() {

    const { 
      selectedRowKeys, 
      visible, 
      loading, 
      submitting 
    } = this.state

    const rowSelection = { selectedRowKeys, onChange: this.onSelectChange }


    return (
      <div className="body">
        <div className="btn-group">
          <Button
            className="float-right margin-left-20"
            type="danger"
            disabled={this.state.selectedRowKeys.length === 0}
            onClick={this.delete} >
            <Icon type="delete" /> 删除
          </Button>
          <Button
            className="float-right"
            type="primary"
            onClick={this.showModal} >
            <Icon type="plus" />新增
          </Button>
        </div>
        <Table rowKey={record => record.id.toString()}
          rowSelection={rowSelection}
          columns={this.state.columns}
          dataSource={this.state.data} />
        <Modal
          visible={visible}
          title="新增标签"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel} disabled={submitting}>取消</Button>,
            <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
              提交
            </Button>,
          ]}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      </div>
    )
  }
}

export default Header