import * as React from 'react'

import { Form, Input } from 'antd'

import { IProp } from './models'

import './style.css'


class CategorysForm extends React.Component<IProp> {

    constructor(prop: IProp) {

        super(prop)
        this.setFormData = this.setFormData.bind(this)
    }

    setFormData(e: any) {
        this.props.setFormData({
            id: this.props.data.id,
            category: e.target.value
        })
    }

    componentWillMount() { }

    render() {

        const { getFieldDecorator } = this.props.form

        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 18 },
        }

        let { category } = this.props.data

        return (
            <Form {...formItemLayout}>
                <Form.Item label="标签" >
                    {getFieldDecorator('category', {
                        initialValue: category,
                        rules: [{
                            required: true, message: 'Please input category name',
                        }],
                    })(<Input onChange={this.setFormData} />)}
                </Form.Item>
            </Form>
        )
    }
}

export default Form.create({ name: 'categorys' })(CategorysForm)