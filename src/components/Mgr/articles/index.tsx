import * as React from 'react'

import Editor from './editor'

import { Button, Icon, Table } from 'antd'

import * as ajax from '@utils/ajax'

import { IResData, IArticle } from '@models'
import { IState, IResArticles, IResTags, IResCategory } from './models'

import './style.css'

class Header extends React.Component<object, IState> {

  constructor(prop: object) {
    super(prop)

    this.state = {
      data: [],
      selectedRowKeys: [],
      tags: [],
      categorys: [],
      columns: [{
        title: 'ID',
        dataIndex: 'id',
        width: 10,
      }, {
        title: '标题',
        dataIndex: 'title',
        width: 800,
      }, {
        title: '操作',
        key: 'operation',
        width: 100,
        render: (text: any, record: any) => {
          return (
            <span>
              <a href="javascript:;" onClick={this.switchEditState.bind(this, record.id)}>编辑</a>
            </span>
          )
        },
      }],
      isEditor: false,
      article: {
        title: '',
        content: ''
      }
    }

    this.onSelectChange = this.onSelectChange.bind(this);
    this.switchEditState = this.switchEditState.bind(this);
    this.delete = this.delete.bind(this);
  }

  getTags() {
    let _this = this
    ajax.$get('/api/tags', function (resData: IResTags): void {
      _this.setState({
        tags: [...resData.data]
      })
    })
  }


  getCategorys() {
    let _this = this
    ajax.$get('/api/categorys', function (resData: IResCategory): void {
      _this.setState({
        categorys: [...resData.data]
      })
    })
  }

  // 获取文章列表
  getData() {

    let _this = this
    ajax.$get('/api/articles', function (resData: IResArticles): void {
      _this.setState({
        data: [...resData.data]
      })
    })
  }

  // 新增文章
  addArticle(data: IArticle) {

    let _this = this
    ajax.$post('/api/articles', data, function (resData: IResData) {
      console.log(resData)
    })
  }

  // 删除文章
  delete() {

    let _this = this
    let options = {
      ids: this.state.selectedRowKeys
    }

    ajax.$delete('/api/articles', options, function (resData: IResData): void {
      console.log(resData)
    })
  }

  // 更新文章
  updateArticle(data: IArticle) {

    let _this = this
    ajax.$put('/api/articles', data, function (resData: IResData) {
      console.log(resData)
    })
  }

  // 切换编辑状态
  switchEditState(id: any) {

    let state: boolean
    let article: IArticle

    state = this.state.isEditor
    article = { id: null, title: '', content: '' }

    if (!state) {
      article = typeof id === 'number' ? this.state.data.filter(item => item.id === id)[0] : article
    }

    this.setState({
      isEditor: !this.state.isEditor,
      article
    })
  }

  // 复选框
  onSelectChange(selectedRowKeys: number[]): void {
    this.setState({ selectedRowKeys });
  }

  componentDidMount() {
    this.getData()
    this.getTags()
    this.getCategorys()
  }

  render() {

    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    }

    return (
      <div className="body">
        <div className="btn-group">
          {
            this.state.isEditor
              ? <Button
                className="float-right"
                onClick={this.switchEditState} >
                <Icon type="left" />返回
                </Button>
              : <>
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
                  onClick={this.switchEditState} >
                  <Icon type="plus" />新增
                  </Button>
              </>
          }
        </div>
        {
          this.state.isEditor
            ? <Editor tags={this.state.tags} categorys={this.state.categorys} data={this.state.article} update={this.updateArticle} add={this.addArticle} />
            : <Table rowKey={record => record.id.toString()}
              rowSelection={rowSelection}
              columns={this.state.columns}
              dataSource={this.state.data} />
        }
      </div>
    )
  }
}

export default Header