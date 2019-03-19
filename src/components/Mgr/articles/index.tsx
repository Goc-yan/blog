import * as React from 'react'

import Mgr from '@components/Mgr'

import { TableColumn, ResData, Article } from '@models'
import { $get, $post } from '@utils/ajax'

import { Button, Icon, Table } from 'antd'

import './style.css'

interface State {
  data: Article[]
  selectedRowKeys: number[]
  columns: TableColumn[]
  isEditor: boolean
  article: Article
}

interface resArticles extends ResData {
  data: Article[]
}

interface SwitchEditState {
  (id?: number): void
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

  // 修改文章


  // 获取文章列表
  getData() {

    let _this = this
    $get('/api/articles/list', function (resData: resArticles): void {
      _this.setState({
        data: [...resData.data]
      })
    })
  }

  // 新增文章
  addArticle() {

    let _this = this
    let data = {
      title: '标题',
      content: '内容'
    }
    $post('/api/articles/add', data, function (resData: ResData) {
      console.log(resData)
    })
  }

  // 删除文章
  delete() {

    let _this = this
    let options = {
      data: this.state.selectedRowKeys
    }

    $post('/api/articles/delete', options, function (resData: ResData): void {
      console.log(resData)
    })
  }

  // 切换编辑状态
  switchEditState(id: any) {

    let article
    if (typeof id === 'number') {
      article = this.state.data.filter(item => item.id === id)[0]
    }

    if (!article) article = this.state.article

    this.setState({
      isEditor: !this.state.isEditor,
      article
    })
  }

  // 复选框
  onSelectChange(selectedRowKeys: number[]): void {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  }

  componentDidMount() {
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
            ? <Mgr.Editor data={this.state.article} />
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