import * as React from 'react'

import Blog from '@components/blog'

import '../../styles/reset.css'

export default class App extends React.Component {
    render() {
        console.log('hello blog')
        return (
            <div className="test clearfix">
                <Blog.Header />
                <Blog.Home />
            </div>
        )
    }
}
