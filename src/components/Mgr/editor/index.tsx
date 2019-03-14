import * as React from 'react'


import { Form, Input, Select, Button, Tag } from 'antd'

// import * as marked from 'marked';
// import * as hljs from 'highlight.js';
// import Editor from 'for-editor'

const { Option } = Select
const CheckableTag = Tag.CheckableTag

const tagsFromServer = ['Movies', 'Books', 'Music', 'Sports']

interface State {
  confirmDirty: boolean
  autoCompleteResult: string[]
  selectedTags: string[]
  articleDetail: any
}

class RegistrationForm extends React.Component<any, State> {

  constructor(prop: any) {

    super(prop)
    this.state = {
      confirmDirty: false,
      autoCompleteResult: [],
      selectedTags: [],
      articleDetail: '',
    }
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

  componentWillMount() {

  }

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
      <>
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Form.Item label="标题" >
            {getFieldDecorator('title', {
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
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">保存</Button>
          </Form.Item>
        </Form>
        {/* <div className="content">
          <div
            id="content"
            className="article-detail"
            dangerouslySetInnerHTML={{
              __html: this.state.articleDetail.content ? marked(this.state.articleDetail.content) : null
            }}
          />
        </div> */}
      </>
    )
  }
}

export default Form.create({ name: 'register' })(RegistrationForm)