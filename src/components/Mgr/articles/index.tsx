import * as React from 'react'

import Mgr from '@components/Mgr'
import Editor from './editor'

import { Button, Icon, Table } from 'antd'

import * as ajax from '@utils/ajax'

import { IResData, IArticle } from '@models'
import { IState, IResArticles, IResTags, IResCategory } from './models'

import './style.css'

export default class Component extends React.Component<object, IState> {

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
              <a href="javascript:;" onClick={this.handleEditor.bind(this, record.id)}>编辑</a>
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
    this.handleEditor = this.handleEditor.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.updateArticle = this.updateArticle.bind(this);
    this.addArticle = this.addArticle.bind(this);
    this.delArticle = this.delArticle.bind(this);
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
      if (resData.errCode === 0) {
        _this.switchEditState()
        _this.getData()
      }
    })
  }

  // 删除文章
  delArticle() {

    let _this = this
    let options = {
      ids: this.state.selectedRowKeys
    }

    ajax.$delete('/api/articles', options, function (resData: IResData): void {
      console.log(resData)
      _this.getData()
    })
  }

  // 更新文章
  updateArticle(data: IArticle) {

    let _this = this

    ajax.$put('/api/articles', data, function (resData: IResData) {
      if (resData.errCode === 0) {
        _this.switchEditState()
        _this.getData()
      }
    })
  }

  // 切换编辑状态
  switchEditState() {

    let isEditor = this.state.isEditor
    this.setState({
      isEditor: !isEditor
    })
  }

  // 编辑文章 => 切换编辑状态，传入需编辑的文章
  handleEditor(id: number) {

    this.setState({
      article: this.state.data.filter(item => item.id === id)[0]
    })
    this.switchEditState()
  }
  // 新增文章 => 切换编辑状态，传入空模板
  handleAdd() {

    this.setState({
      article: { id: null, title: '', content: '' }
    })
    this.switchEditState()
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

    const { selectedRowKeys, isEditor } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    }

    return (
      <div className="body">
        <Mgr.Btngroup 
          selectedRowKeys={selectedRowKeys} 
          isEditor={isEditor} 
          handleAdd={this.handleAdd} 
          handleDel={this.delArticle} 
          handleSwitch={this.switchEditState} />
        {
          isEditor
            ? <Editor 
                tags={this.state.tags} 
                categorys={this.state.categorys} 
                data={this.state.article} 
                add={this.addArticle}
                update={this.updateArticle}  />
            : <Table 
                rowKey={record => record.id.toString()}
                rowSelection={rowSelection}
                columns={this.state.columns}
                dataSource={this.state.data} />
        }
      </div>
    )
  }
}