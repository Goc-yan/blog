import * as React from 'react'

import './style.css'

// AJAX
import { $get } from '@utils/ajax'

// 接口
import { IResArticles, IState } from './models'

export default class Home extends React.Component<object, IState> {

  constructor(prop: object) {
    super(prop)

    this.state = {
      list: []
    }
  }

  getData() {

    let _this = this
    $get('/api/articles', function (resData: IResArticles): void {

      resData.errCode === 0
        ? _this.setState({
          list: [...resData.data]
        })
        : console.log(resData.errMsg)
    })
  }

  componentDidMount() {
    this.getData()
  }

  render() {
    return (
      <div className="body">
        <ul className="list-wrapper">
          {this.state.list.map((data, index) => <li key={index}><a href="#">{data.title}</a></li>)}
        </ul>
      </div>
    )
  }
}
