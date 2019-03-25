import * as React from 'react'

import { Form, Input } from 'antd'

import { IProp } from './models'

import './style.css'


class TagsForm extends React.Component<IProp> {

    constructor(prop: IProp) {

        super(prop)
        this.setFormData = this.setFormData.bind(this)
    }

    setFormData(e: any) {
        this.props.setFormData({
            id: this.props.data.id,
            tagName: e.target.value
        })
    }

    componentWillMount() { }

    render() {

        const { getFieldDecorator } = this.props.form

        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 18 },
        }

        let { tagName } = this.props.data

        return (
            <Form {...formItemLayout}>
                <Form.Item label="标签" >
                    {getFieldDecorator('tagName', {
                        initialValue: tagName,
                        rules: [{
                            required: true, message: 'Please input tag name',
                        }],
                    })(<Input onChange={this.setFormData} />)}
                </Form.Item>
            </Form>
        )
    }
}

export default Form.create({ name: 'tags' })(TagsForm)