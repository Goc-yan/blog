import React, { Component } from 'react'
import axios from 'axios'

import { Row, Col, List, Checkbox, Button, Icon, Table, Divider, Tag } from 'antd';
import "antd/dist/antd.css";

import './style.css'

class Header extends Component {

  constructor(prop) {
    super(prop)

    this.state = {
      selectedRowKeys: [],
      columns: [{
        title: 'ID',
        dataIndex: 'id',
        width: 10,
      }, {
        title: '标题',
        dataIndex: 'title',
        width: 800,
      }, {
        title: 'Action',
        key: 'operation',
        width: 50,
        render: (text, record) => (
          <span>
            <a href="javascript:;">editor</a>
          </span>
        ),
      }],
      data: []
    }

    this.onSelectChange = this.onSelectChange.bind(this);
    this.delete = this.delete.bind(this);

  }

  getData() {

    let _this = this
    var url = '//192.168.1.13:3000/api/articles/list'
    axios.get(url).then(function (data) {
      _this.setState({
        data: [...data.data]
      })
    })
  }

  delete() {

    let _this = this
    let url = '//192.168.1.13:3000/api/articles/delete'
    let options = {
      data: this.state.selectedRowKeys
    }

    axios.post(url, options)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onSelectChange(selectedRowKeys) {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  }

  componentDidMount() {
    console.log('componentDidMount')
    this.getData()
  }

  render() {

    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;

    return (
      <div className="body">
        <Row className="margin-bottom-20">
          <Col span={4} offset={20}>
            <div>
              <Button
                className="float-right margin-left-20"
                type="danger"
                disabled={this.state.selectedRowKeys.length === 0}
                onClick={this.delete} >
                <Icon type="delete" />
                删除
              </Button>
              <Button className="float-right" type="primary"><Icon type="plus" />新增</Button>
            </div>
          </Col>
        </Row>
        <Table rowKey={record => record.id} rowSelection={rowSelection} columns={this.state.columns} dataSource={this.state.data} />

      </div>
    )
  }
}

export default Header