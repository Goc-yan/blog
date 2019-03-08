import React, { Component } from 'react'

import Blog from '@components/blog'

// import { Row, Col } from 'antd';

class App extends Component {
    render() {
        return (
            <>
                <Blog.Header />
                <Blog.Body />
                {/* <Blog.Footer /> */}
            </>
        )
    }
}

export default App