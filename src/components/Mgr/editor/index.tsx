import * as React from 'react'


import { Form, Input, Select, Button, Tag } from 'antd'

import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

import './style.css'

import { IArticle } from '@models'

const { Option } = Select
const CheckableTag = Tag.CheckableTag

const tagsFromServer = ['Movies', 'Books', 'Music', 'Sports']

interface State {
  confirmDirty: boolean
  autoCompleteResult: string[]
  selectedTags: string[]
  modules: any
  formats: string[]
}

interface Prop {
  data: IArticle
  form: any
  update: any
  add: any
}

class RegistrationForm extends React.Component<Prop, State> {

  constructor(prop: Prop) {

    super(prop)

    this.state = {
      confirmDirty: false,
      autoCompleteResult: [],
      selectedTags: [],
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
  }

  handleSubmit = (e: any): void => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err: string, values: object) => {

      if (!err) {

        let { update, add, data } = this.props
        let { id } = data

        id ? update({ id, ...values }) : add(values)
      }
    })
  }

  handleChange(tag: string, checked: boolean) {

    const { selectedTags } = this.state
    const nextSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter(t => t !== tag)
    this.setState({ selectedTags: nextSelectedTags })
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

    let { title, content } = this.props.data

    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <Form.Item label="标题" >
          {getFieldDecorator('title', {
            initialValue: title,
            rules: [{
              required: true, message: 'Please input article title',
            }],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="分类" >
          {getFieldDecorator('category', {
            initialValue: '1',
          })(<Select>
            <Option value="1">随笔</Option>
            <Option value="2">技术</Option>
            <Option value="3">没了</Option>
          </Select>)}
        </Form.Item>
        <Form.Item label="标签" >
          {getFieldDecorator('tag', {
            initialValue: this.state.selectedTags
          })(<>
              {tagsFromServer.map(tag => (
                <CheckableTag
                  key={tag}
                  checked={this.state.selectedTags.indexOf(tag) > -1}
                  onChange={checked => this.handleChange(tag, checked)}>
                  {tag}
                </CheckableTag>
              ))}
            </>)
          }
        </Form.Item>
        <Form.Item label="正文">
          {getFieldDecorator('content', {
            initialValue: content,
          })(<ReactQuill
            theme="snow"
            modules={this.state.modules}
            formats={this.state.formats} />)
          }
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">保存</Button>
        </Form.Item>
      </Form>
    )
  }
}

export default Form.create({ name: 'register' })(RegistrationForm)