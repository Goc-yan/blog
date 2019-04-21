// 引入 react 组件
import * as React from 'react'
import * as ReactDOM from 'react-dom'

// 引入 自定义react 组件
import Common from '@components/Common'

// 引入 antd 组件
import { Table, Modal } from 'antd'

// 引入接口参数
import { IProp, IState } from './models'

// 引入方法
import * as ajax from '@utils/ajax'


// 引入样式
import './style.css'

export default class Component extends React.Component<IProp, IState> {

  constructor(prop: IProp) {
    super(prop)

    this.state = {
      selectedRowKeys: [],
      visible: false,
    }

    this.onSelectChange = this.onSelectChange.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleSwitch = this.handleSwitch.bind(this);

  }

  // 复选框
  onSelectChange(selectedRowKeys: number[]): void {
    console.log('selectedRowKeys:', selectedRowKeys)
    this.setState({ selectedRowKeys });
  }

  /** 新增 */
  handleAdd() {
    // 绑定父组件方法
    // this.setState({
    //   isEdited: true
    // })
  }

  /** 删除 */
  handleDel() {

    let url = `/api/${this.props.api}`
    let options = {
      ids: this.state.selectedRowKeys
    }

    ajax.$delete(url, options, function (resData: any): void {

      // 删除成功, 重新获取数据
      if (resData.errCode === 0) {
        console.log('success')
      }
    })
  }

  /** 切换编辑状态 */
  handleSwitch() {
    // let isEdited = !this.state.isEdited
    // this.setState({
    //   isEdited
    // })
  }

  componentDidMount() {
    console.log(this.props)
  }

  render() {

    let { showOperating, data, columns, isEdited} = this.props

    let { selectedRowKeys } = this.state

    const rowSelection = {
      onChange: this.onSelectChange,
    }

    return (
      <div className="body">
        {
          showOperating
            ? <>
              <Common.Btngroup
                selectedRowKeys={selectedRowKeys}
                isEdited={isEdited}

                handleAdd={this.handleAdd}
                handleDel={this.handleDel}
                handleSwitch={this.handleSwitch} />
              <Table
                rowKey={record => record.id.toString()}
                rowSelection={rowSelection}
                columns={columns}
                dataSource={data} />
            </>
            : <Table
              rowKey={record => record.id.toString()}
              columns={columns}
              dataSource={data} />
        }
      </div>
    )
  }
}