import * as React from 'react'
import Editor from './editor'

import { Modal, Button, Icon, Table } from 'antd'

import * as ajax from '@utils/ajax'

import { ITag, IResData } from '@models'
import { IState, IResArticles } from './models'

import './style.css'

class Header extends React.Component<object, IState> {

  public child: any

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
        tagName: ''
      },
      columns: [{
        title: 'ID',
        dataIndex: 'id',
        width: 10,
      }, {
        title: '标签名称',
        dataIndex: 'tagName',
        width: 800,
      }, {
        title: '操作',
        key: 'operation',
        width: 100,
        render: (text: string, record: ITag) => (
          <span>
            <a href="javascript:;" onClick={this.showEditorModal.bind(this, record)}>编辑</a>
          </span>
        ),
      }],
    }

    this.setDefaultData = this.setDefaultData.bind(this)
    this.getData = this.getData.bind(this)
    this.onSelectChange = this.onSelectChange.bind(this)
    this.delete = this.delete.bind(this)
    this.showEditorModal = this.showEditorModal.bind(this)
    this.handleOk = this.handleOk.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
  }


  onRef = (ref: any) => {
    this.child = ref
  }

  setDefaultData() {
    this.setState({
      loading: false,
      visible: false,
      submitting: false,
      editorData: {
        id: null,
        tagName: ''
      }
    })
  }

  getData() {

    let _this = this
    ajax.$get('/api/tags', function (resData: IResArticles): void {
      _this.setState({
        data: [...resData.data]
      })
    })
  }

  addTag(data: ITag) {

    let _this = this

    ajax.$post('/api/tags', data, function (resData: IResData): void {

      // 保存成功, 重新获取数据
      if (resData.errCode === 0) _this.getData()
      _this.setDefaultData()
    })
  }

  delete() {

    let _this = this
    let options = {
      ids: this.state.selectedRowKeys
    }

    ajax.$delete('/api/tags', options, function (resData: IResData): void {

      // 删除成功, 重新获取数据
      if (resData.errCode === 0) _this.getData()
    })
  }

  updateTag(data: ITag) {

    let _this = this
    ajax.$put('/api/tags', data, function (resData: IResData): void {

      // 更新成功, 重新获取数据
      if (resData.errCode === 0) _this.getData()
      _this.setDefaultData()
    })
  }

  onSelectChange(selectedRowKeys: number[]): void {
    this.setState({ selectedRowKeys })
  }

  showEditorModal(data: any) {

    let editorData: ITag = { id: null, tagName: '' }
    if (data.id) editorData = { ...data }

    this.setState({
      visible: true,
      editorData
    })
  }

  handleOk() {

    let _this = this

    // TODO： 计划使用 await 优化结构
    this.child.verification().then(function (values: any) {

      _this.setState({ loading: true, submitting: true })
      let data = _this.state.editorData
      data.tagName = values.tagName
      data.id ? _this.updateTag(data) : _this.addTag(data)
    })
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
            onClick={this.showEditorModal} >
            <Icon type="plus" />新增
          </Button>
        </div>
        <Table rowKey={record => record.id.toString()}
          rowSelection={rowSelection}
          columns={this.state.columns}
          dataSource={this.state.data} />
        {
          visible
            ? <Modal
              visible={true}
              title={editorData.id ? '修改标签' : '新增标签'}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
              footer={[
                <Button key="back" onClick={this.handleCancel} disabled={submitting}>取消</Button>,
                <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
                  提交
                  </Button>
              ]}>
              <Editor onRef={this.onRef} data={editorData} />
            </Modal>
            : null
        }
      </div>
    )
  }
}

export default Header