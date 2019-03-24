import * as React from 'react'
import Editor from './editor'

import { Modal, Button, Icon, Table } from 'antd'

import * as ajax from '@utils/ajax'

import { ICategory, IResData } from '@models'
import { IState, IResArticles } from './models'

import './style.css'

class Header extends React.Component<object, IState> {

  constructor(prop: object) {
    super(prop)

    this.state = {
      data: [],
      selectedRowKeys: [],
      loading: false,
      visible: false,
      submitting: false,
      editorData: {
        id: null,
        category: ''
      },
      columns: [{
        title: 'ID',
        dataIndex: 'id',
        width: 10,
      }, {
        title: '标签名称',
        dataIndex: 'category',
        width: 800,
      }, {
        title: '操作',
        key: 'operation',
        width: 100,
        render: (text: string, record: ICategory) => (
          <span>
            <a href="javascript:;" onClick={ this.showModal.bind(this, record) }>编辑</a>
          </span>
        ),
      }],
    }

    this.onSelectChange = this.onSelectChange.bind(this)
    this.delete = this.delete.bind(this)
    this.showModal = this.showModal.bind(this)
    this.handleOk = this.handleOk.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.getFormData = this.getFormData.bind(this)
  }

  getData() {

    let _this = this
    ajax.$get('/api/categorys', function (resData: IResArticles): void {
      _this.setState({
        data: [...resData.data]
      })
    })
  }

  addCategory(data: ICategory) {

    let _this = this

    ajax.$post('/api/categorys', data, function (resData: IResData): void {
      console.log(resData)

      _this.setState({
        loading: false,
        visible: false,
        submitting: false
      })
    })
  }

  delete() {

    let _this = this
    let options = {
      ids: this.state.selectedRowKeys
    }

    ajax.$delete('/api/categorys', options, function (resData: IResData): void {
      console.log(resData)
    })
  }

  updateCategory(data: ICategory) {

    let _this = this
    ajax.$put('/api/categorys', data, function (resData: IResData): void {
      console.log(resData)

      _this.setState({
        loading: false,
        visible: false,
        submitting: false
      })
    })
  }

  getFormData(editorData: ICategory) {
    this.setState({
      editorData
    })
  }

  onSelectChange(selectedRowKeys: number[]): void {
    console.log('selectedRowKeys changed: ', selectedRowKeys)
    this.setState({ selectedRowKeys })
  }

  showModal(data: any) {

    let editorData: ICategory = { id: null, category: '' }
    if (data.id) editorData = { ...data }

    this.setState({
      visible: true,
      editorData
    })
  }

  handleOk() {

    this.setState({ loading: true, submitting: true })

    let data = this.state.editorData

    data.id ? this.updateCategory(data) : this.addCategory(data)
  }

  handleCancel() {
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
      submitting,
      editorData
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
          title={ editorData.id ? '修改分类' : '新增分类'}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel} disabled={submitting}>取消</Button>,
            <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
              提交
            </Button>,
          ]}
        >
          <Editor ref='editorForm' data={editorData} setFormData={this.getFormData} />
        </Modal>
      </div>
    )
  }
}

export default Header