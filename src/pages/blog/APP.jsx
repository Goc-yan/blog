import React, { Component } from 'react'

import Blog from '@components/blog'

class App extends Component {
    render() {
        return (
            <>
                <Blog.Header />
                <Blog.Home />
            </>
        )
    }
}

export default App