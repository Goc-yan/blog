import * as React from 'react'

import { Form, Input } from 'antd'

import { IProp, IEditorState } from './models'

import './style.css'
import { async, Promise } from 'q';


class TagsForm extends React.Component<IProp, IEditorState> {

    constructor(prop: IProp) {

        super(prop)

        this.state = {
            tag: {
                id: null,
                tagName: ''
            }
        }

        this.handleChange = this.handleChange.bind(this)
    }

    handleChange = function (event: any) {

        let tagName = event.target.value
        let data = this.state.tag
        data.tagName = tagName
        // TODO: 写法有待改善
        this.setState({
            tag: { ...data }
        })
    }

    verification = function () {

        return Promise((resolve, reject) => {
            this.props.form.validateFields((err: any, values: any) => {
                if (!err) resolve()
            });
        })
    }

    componentWillMount() {

        this.props.onRef(this)
        this.setState({
            tag: this.props.data
        })
    }

    render() {

        const { getFieldDecorator } = this.props.form

        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 18 },
        }

        return (
            <Form {...formItemLayout}>
                <Form.Item label="标签" >
                    {getFieldDecorator('tagName', {
                        initialValue: this.state.tag.tagName,
                        rules: [{
                            required: true, message: 'Please input tag name',
                        }],
                    })(<Input onChange={this.handleChange} />)}
                </Form.Item>
            </Form>
        )
    }
}

export default Form.create({ name: 'tags' })(TagsForm)