import * as React from 'react'

import { Button, Icon } from 'antd'

import { IProp } from './models'

import './style.css'

export default function component(props: IProp) {

  
  let { selectedRowKeys, isEditor, handleAdd, handleDel, handleSwitch } = props
  return <div className="btn-group">
    {
      isEditor
        ? <Button
          className="float-right"
          onClick={handleSwitch} >
          <Icon type="left" />返回
          </Button>
        : <>
          <Button
            className="float-right margin-left-20"
            type="danger"
            disabled={selectedRowKeys.length === 0}
            onClick={handleDel} >
            <Icon type="delete" /> 删除
            </Button>
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
