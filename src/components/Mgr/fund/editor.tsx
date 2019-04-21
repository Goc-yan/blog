import * as React from 'react'

import { Form, Input } from 'antd'

import { IProp } from './models'

import { Promise } from 'q';


class Component extends React.Component<IProp> {


  constructor(prop: IProp) {
    super(prop)
  }

  verification = function () {

    return Promise((resolve, reject) => {
      this.props.form.validateFields((err: any, values: any) => {
        if (!err) resolve()
      })
    })
  }

  componentWillMount() {
    console.log('componentWillMount')
    this.props.onRef(this)
  }

  render() {

    const { getFieldDecorator } = this.props.form

    const formItemLayout = { labelCol: { span: 4 }, wrapperCol: { span: 18 } }

    return <Form {...formItemLayout}>
      <Form.Item label="基金代码" >
        {getFieldDecorator('code', {
          initialValue: 'test',
          rules: [{
            required: true, message: 'Please input funk code',
          }],
        })(<Input />)}
      </Form.Item>
    </Form>
  }
}

export default Form.create()(Component)