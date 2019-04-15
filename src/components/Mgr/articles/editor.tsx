import * as React from 'react'

import { Form, Input, Select, Button, Tag } from 'antd'
const { Option } = Select
const { TextArea } = Input
const CheckableTag = Tag.CheckableTag

import { ITag } from '@models';
import { IProp, IEditorState } from './models'

import './style.css'

class RegistrationForm extends React.Component<IProp, IEditorState> {

  constructor(prop: IProp) {

    super(prop)

    this.state = {
      selectedTags: [],
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

  handleChange(tag: ITag, checked: boolean) {

    const { selectedTags } = this.state
    const nextSelectedTags = checked
      ? [...selectedTags, tag.id]
      : selectedTags.filter(t => t !== tag.id)
    this.setState({ selectedTags: nextSelectedTags })
  }

  componentWillMount() {
    this.setState({
      selectedTags: this.props.data.tags || [],
    })
  }

  render() {

    const { getFieldDecorator } = this.props.form

    // from 表单格式
    const formItemLayout = { labelCol: { span: 2 }, wrapperCol: { span: 22 }, }
    const tailFormItemLayout = { wrapperCol: { span: 3, offset: 12 } }

    let { tags, categorys, data } = this.props
    let { title, content, category } = data

    let { selectedTags } = this.state

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
            initialValue: category || this.props.categorys[0].id.toString(),
          })(<Select>
            {
              categorys.map(data => (
                <Option value={data.id.toString()}>{data.category}</Option>
              ))
            }
          </Select>)}
        </Form.Item>
        <Form.Item label="标签" >
          {getFieldDecorator('tags', {
            initialValue: selectedTags
          })(<>
            {tags.map(tag => (
              <CheckableTag
                key={tag.id}
                checked={selectedTags.indexOf(tag.id) > -1}
                onChange={checked => this.handleChange(tag, checked)}>
                {tag.tagName}
              </CheckableTag>
            ))}
          </>)
          }
        </Form.Item>
        <Form.Item label="正文">
          {getFieldDecorator('content', {
            initialValue: content,
            rules: [{
              required: true, message: 'Please input article content',
            }],
          })(<TextArea rows={16} />)
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