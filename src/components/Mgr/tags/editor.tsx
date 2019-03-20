import * as React from 'react'


import { Form, Input, Select, Button, Tag } from 'antd'

import './style.css'

import { IArticle, ITag } from '@models'

const { Option } = Select
const CheckableTag = Tag.CheckableTag

interface Prop {
    form: any
    data: ITag
    //   update: any
    //   add: any
}

class RegistrationForm extends React.Component<Prop> {

    constructor(prop: Prop) {

        super(prop)
    }

    handleSubmit = (e: any): void => {
        e.preventDefault()
        this.props.form.validateFieldsAndScroll((err: string, values: object) => {

            if (!err) {

                // let { update, add, data } = this.props
                // let { id } = data

                // id ? update({ id, ...values }) : add(values)
            }
        })
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

        let { tagName } = this.props.data

        return (
            <Form {...formItemLayout}>
                <Form.Item label="标签" >
                    {getFieldDecorator(tagName, {
                        initialValue: 'tag',
                        rules: [{
                            required: true, message: 'Please input tag name',
                        }],
                    })(<Input />)}
                </Form.Item>
            </Form>
        )
    }
}

export default Form.create({ name: 'register' })(RegistrationForm)