import * as React from 'react'


import { Form, Input, Select, Button, Tag } from 'antd'

import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

import './style.css'

import { Article } from '@models'

const { Option } = Select
const CheckableTag = Tag.CheckableTag

const tagsFromServer = ['Movies', 'Books', 'Music', 'Sports']

interface State {
  confirmDirty: boolean
  autoCompleteResult: string[]
  selectedTags: string[]
  text?: any
  modules: any
  formats: string[]
}

interface Prop {
  data: Article
  form: any
}

class RegistrationForm extends React.Component<Prop, State> {

  constructor(prop: Prop) {

    super(prop)

    console.log(prop)
    this.state = {
      confirmDirty: false,
      autoCompleteResult: [],
      selectedTags: [],
      text: '',
      modules: {
        toolbar: [
          [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code'],
          [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
          ['link', 'image'],
          ['clean']
        ],
      },
      formats: [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote', 'code',
        'list', 'bullet', 'indent',
        'link', 'image'
      ],
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleRichChange = this.handleRichChange.bind(this)
  }

  handleSubmit = (e: any) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err: string, values: object) => {

      if (!err) {
        console.log('Received values of form: ', values)
      }
    })
  }

  handleConfirmBlur = (e: any) => {
    const value = e.target.value
    this.setState({ confirmDirty: this.state.confirmDirty || !!value })
  }

  handleChange(tag: string, checked: boolean) {

    const { selectedTags } = this.state
    const nextSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter(t => t !== tag)
    this.setState({ selectedTags: nextSelectedTags })
  }

  handleRichChange(value: any): void {
    this.setState({ text: value })
  }

  componentWillMount() { }

  render() {
    const { getFieldDecorator } = this.props.form

    const formItemLayout = {
      labelCol: { span: 2 },
      wrapperCol: { span: 22 },
    }
    const tailFormItemLayout = {
      wrapperCol: { span: 3, offset: 12 },
    }

    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <Form.Item label="标题" >
          {getFieldDecorator('title', {
            initialValue: this.props.data.title,
            rules: [{
              required: true, message: 'Please input article title',
            }],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="分类" >
          <Select defaultValue="1">
            <Option value="1">Option 1</Option>
            <Option value="2">Option 2</Option>
            <Option value="3">Option 3</Option>
          </Select>
        </Form.Item>
        <Form.Item label="标签" >
          {tagsFromServer.map(tag => (
            <CheckableTag
              key={tag}
              checked={this.state.selectedTags.indexOf(tag) > -1}
              onChange={checked => this.handleChange(tag, checked)}
            >
              {tag}
            </CheckableTag>
          ))}
        </Form.Item>
        <Form.Item label="正文">
          <ReactQuill
            theme="snow"
            modules={this.state.modules}
            formats={this.state.formats}
            value={this.props.data.content}
            onChange={this.handleRichChange} />
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">保存</Button>
        </Form.Item>
      </Form>
    )
  }
}

export default Form.create({ name: 'register' })(RegistrationForm)