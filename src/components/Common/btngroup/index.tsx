import * as React from 'react'

import { Popover, Button, Icon } from 'antd'

import { IProp, IState } from './models'

import './style.css'


export default class Component extends React.Component<IProp, IState> {

  constructor(prop: IProp) {
    super(prop)

    this.state = {
      visible: false
    }

    this.hide = this.hide.bind(this)
    this.handleDel = this.handleDel.bind(this)
    this.handleVisibleChange = this.handleVisibleChange.bind(this)
  }

  hide() {
    this.setState({ visible: false })
  }

  handleVisibleChange(visible: boolean) {
    this.setState({ visible })
  }

  handleDel() {
    this.props.handleDel()
    this.hide()
  }

  render() {

    let { selectedRowKeys, isEdited, handleAdd, handleSwitch } = this.props
    let { visible } = this.state

    return <div className="btn-group">
      {
        isEdited
          ? <Button
              className="float-right"
              onClick={handleSwitch} >
              <Icon type="left" />返回
            </Button>
          : <>
              <Popover
                content={
                  <div className="clearfix">
                    <p className="marB-10">是否确定删除以下 <span className="col_red">{selectedRowKeys.length}</span> 条数据?</p>
                    <div className="clearfix float-right">
                      <Button type="danger" className="marR-20" onClick={this.handleDel}>删除</Button>
                      <Button onClick={this.hide}>取消</Button>
                    </div>
                  </div>
                }
                title="提示"
                trigger="click"
                visible={visible}
                onVisibleChange={this.handleVisibleChange} >
                <Button
                  className="float-right margin-left-20"
                  type="danger"
                  disabled={selectedRowKeys.length === 0}>
                  <Icon type="delete" /> 删除
                </Button>
              </Popover>
              <Button
                className="float-right"
                type="primary"
                onClick={handleAdd} >
                <Icon type="plus" />新增
              </Button>
            </>
      }
    </div>
  }
}
