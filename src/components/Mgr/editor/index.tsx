// import * as React from 'react'

// import { TableColumn, ResData, Article } from '@models'

// import {
//   Form, Select, Input, Button,
// } from 'antd';

// const { Option } = Select;

// import "antd/dist/antd.css"
// import './style.css'

// class Component extends React.Component<any> {

//   constructor(prop: any) {
//     super(prop)

//     this.state = { }

//   }
//   render() {
//     return (
//       <>
//         <Form>

//           <Form.Item label="E-mail"></Form.Item>
//         </Form>
//       </>
//     )
//   }
// }

// export default Component


import * as React from 'react'
import {
  Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete,
} from 'antd';

const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

const residences = [{
  value: 'zhejiang',
  label: 'Zhejiang',
  children: [{
    value: 'hangzhou',
    label: 'Hangzhou',
    children: [{
      value: 'xihu',
      label: 'West Lake',
    }],
  }],
}, {
  value: 'jiangsu',
  label: 'Jiangsu',
  children: [{
    value: 'nanjing',
    label: 'Nanjing',
    children: [{
      value: 'zhonghuamen',
      label: 'Zhong Hua Men',
    }],
  }],
}];

interface State {
  confirmDirty: boolean
  autoCompleteResult: string[]
}

class RegistrationForm extends React.Component<any, State> {

  constructor(prop: any) {

    super(prop)
    this.state = {
      confirmDirty: false,
      autoCompleteResult: []
    };
  }


  handleSubmit = (e: any) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err: any, values: any) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  handleConfirmBlur = (e: any) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: { span: 2 },
      wrapperCol: { span: 22 },
    };
    const tailFormItemLayout = {
      wrapperCol: { span: 3, offset: 12 },
    };

    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <Form.Item label="标题" >
          {getFieldDecorator('title', {
            rules: [{
              required: true, message: 'Please input article title',
            }],
          })(<Input />)}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">保存</Button>
        </Form.Item>
      </Form>
    );
  }
}


export default Form.create({ name: 'register' })(RegistrationForm)