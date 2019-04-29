import * as React from 'react'
import { Form, Icon, Input, Button, Checkbox } from 'antd';

import { iState } from './models'
import { $get, $post } from '@utils/ajax'
import { setCookie } from '@utils/lib'


import './style.css'


// function hasErrors(fieldsError: any) {
//   return Object.keys(fieldsError).some(field => fieldsError[field]);
// }



class Component extends React.Component<any, iState> {

  constructor(prop: any) {
    super(prop)

    this.state = {
      data: [],
    }
  }



  handleSubmit = (e: any) => {

    let that = this
    e.preventDefault();
    this.props.form.validateFields((err: any, values: any) => {
      if (!err) {
        var data = {
          userName: values.userName,
          password: values.password,
          timestamp: new Date().getTime()
        }
        $post('/api/login', data, function (resDate: any) {

          if (resDate.errCode !== 0) throw resDate.errMsg

          setCookie('accountName', values.userName, 1)
          that.props.history.push({ pathname: '/' })
        })
      }
    });
  }

  componentDidMount() {
  }

  render() {

    const { getFieldDecorator } = this.props.form
    return (
      <div className="login-warpper">
        <div className="login-box">
          <p className="title">后台管理系统</p>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
              {getFieldDecorator('userName', {
                rules: [{ required: true, message: 'Please input your username!' }],
              })(
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your Password!' }],
              })(
                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
              })(
                <Checkbox>Remember me</Checkbox>
              )}
              <a className="login-form-forgot" href="">Forgot password</a>
              <Button type="primary" htmlType="submit" className="login-form-button">
                Log in
              </Button>
              Or <a href="">register now!</a>
            </Form.Item>
          </Form>
        </div>
      </div>
    )
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(Component);

export default WrappedNormalLoginForm