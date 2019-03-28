import * as React from 'react'

import * as marked from 'marked';
import * as hljs from 'highlight.js';

import './style.css'

// AJAX
import { $get } from '@utils/ajax'
import { getUrlParams } from '@utils/lib'


// 接口
import { IResArticles, IState } from './models'

export default class Home extends React.Component<object, IState> {

  constructor(prop: object) {
    super(prop)

    this.state = {
      data: {
        id: 0,
        title: '',
        content: '',
        tags: [],
        category: '',
      }
    }
  }

  getArticle() {

    let _this = this
    let { articleID } = getUrlParams()
    $get('/api/articles/' + articleID, function (resData: IResArticles): void {

      resData.errCode === 0
        ? _this.setState({
          data: resData.data
        })
        : console.log(resData.errMsg)
    })
  }

  componentDidMount() {

    marked.setOptions({
      renderer: new marked.Renderer(),
      gfm: true,
      tables: true,
      breaks: true,
      pedantic: false,
      sanitize: true,
      smartLists: true,
      smartypants: false,
      highlight: function (code: any) {
        return hljs.highlightAuto(code).value;
      },
    });

    this.getArticle()
  }

  render() {
    let { title, content } = this.state.data
    return (
      <div className="body">
        <div className="content">
          <h3 className="article-header">{title}</h3>
          <div
            id="content"
            className="article-detail"
            dangerouslySetInnerHTML={{ __html: content ? marked(content) : null }}
          />
        </div>
      </div>
    )
  }
}
