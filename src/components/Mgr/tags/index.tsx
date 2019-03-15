import * as React from 'react'

import { ResData, Article } from '@models'
import { $get } from '@utils/ajax'

import { Tag, Input, Tooltip, Icon, } from 'antd'

import "antd/dist/antd.css"

interface State {
  tags: string[]
  inputVisible: boolean
  inputValue: string
}

interface resArticles extends ResData {
  data: Article[]
}

class Header extends React.Component<object, State> {

  private input?: any;

  constructor(prop: object) {
    super(prop)

    this.state = {
      tags: ['tag 1', 'tag 2', 'tag 3', 'tag 4'],
      inputVisible: false,
      inputValue: '',
    }

    this.saveInputRef = this.saveInputRef.bind(this)
    this.showInput = this.showInput.bind(this)

  }

  private handleClose = (removedTag: any) => {
    const tags = this.state.tags.filter(tag => tag !== removedTag);
    console.log(tags);
    this.setState({ tags });
  }

  private showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  }

  private handleInputChange = (e: any) => {
    this.setState({ inputValue: e.target.value });
  }

  private handleInputConfirm = () => {
    const state = this.state;
    const inputValue = state.inputValue;
    let tags = state.tags;
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue];
    }
    console.log(tags);
    this.setState({
      tags,
      inputVisible: false,
      inputValue: '',
    });
  }

  private saveInputRef(input: object) {

    this.input = input
  }

  componentDidMount() {
    console.log('componentDidMount')
  }

  render() {

    const { tags, inputVisible, inputValue } = this.state;
    return (
      <div>
        {tags.map((tag, index) => {
          const isLongTag = tag.length > 20;
          const tagElem = (
            <Tag key={tag} closable={true} afterClose={() => this.handleClose(tag)}>
              {isLongTag ? `${tag.slice(0, 20)}...` : tag}
            </Tag>
          );
          return isLongTag ? <Tooltip title={tag} key={tag}>{tagElem}</Tooltip> : tagElem;
        })}
        {inputVisible && (
          <Input
            ref={this.saveInputRef}
            type="text"
            size="small"
            style={{ width: 78 }}
            value={inputValue}
            onChange={this.handleInputChange}
            onBlur={this.handleInputConfirm}
            onPressEnter={this.handleInputConfirm}
          />
        )}
        {!inputVisible && (
          <Tag
            onClick={this.showInput}
            style={{ background: '#fff', borderStyle: 'dashed' }}
          >
            <Icon type="plus" /> New Tag
          </Tag>
        )}
      </div>
    )
  }
}

export default Header