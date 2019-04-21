import * as React from 'react'

import Mgr from '@components/Mgr'
import Common from '@components/Common'
import Editor from './editor'

import { Button, Icon, Table, Form } from 'antd'

import * as ajax from '@utils/ajax'

import { IResData, IArticle } from '@models'
import { IState, IResArticles, IResTags, IResCategory } from './models'

import './style.css'

const columns = [{
  title: '是否持有',
  width: 100,
  dataIndex: 'isHold',
}, {
  title: '代码',
  width: 200,
  dataIndex: 'code',
}, {
  title: '名称',
  dataIndex: 'name',
}]


export default class Component extends React.Component<object, IState> {

  public editor: any

  constructor(prop: object) {
    super(prop)

    this.state = {
      data: [{
        id: 0,
        isHold: false,
        code: 1000,
        name: 'name'
      }, {
        id: 1,
        isHold: false,
        code: 10001,
        name: 'name1'
      }],
      selectedRowKeys: [],
      columns: [
        ...columns,
        {
          title: '操作',
          key: 'operation',
          width: 100,
          render: (text: any, record: any) => {
            return (
              <span>
                {/* <a href="javascript:;" onClick={this.handleEditor.bind(this, record.id)}>编辑</a> */}
                <a href="javascript:;" >编辑</a>
              </span>
            )
          },
        }]
    }

  }

  onRef = (ref: any) => {
    this.editor = ref
  }

  componentDidMount() { }

  render() {

    const { data, columns } = this.state;

    return (
      <div className="body">
        <Common.Table
          showOperating={true}
          columns={...columns}
          data={...data}
          isEdited={false} >
          <Editor onRef={this.onRef} />
        </Common.Table>
      </div>
    )
  }
}