import * as React from 'react'

import { Form, Input } from 'antd'

import { IProp, IEditorState } from './models'

import './style.css'
import { async, Promise } from 'q';


class CategorysForm extends React.Component<IProp, IEditorState> {

    constructor(prop: IProp) {

        super(prop)

        this.state = {
            category: {
                id: null,
                category: ''
            }
        }

        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event: any) {

        let category = event.target.value
        let data = this.state.category
        data.category = category
        // TODO: 写法有待改善
        this.setState({
            category: { ...data }
        })
    }

    verification = function () {

        return Promise((resolve, reject) => {
            this.props.form.validateFields((err: any, values: any) => {
                if (!err) resolve(values)
            });
        })
    }

    componentWillMount() {

        this.props.onRef(this)
        this.setState({
            category: this.props.data
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
                    {getFieldDecorator('category', {
                        initialValue: this.props.data.category,
                        rules: [{
                            required: true, message: 'Please input category name',
                        }],
                    })(<Input onChange={this.handleChange} />)}
                </Form.Item>
            </Form>
        )
    }
}

export default Form.create({ name: 'categorys' })(CategorysForm)