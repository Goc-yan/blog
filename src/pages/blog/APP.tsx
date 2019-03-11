import * as React from 'react'

import Blog from '@components/blog'

export default class App extends React.Component {
   
    render() {
        return (
            <>
                <Blog.Header />
                <Blog.Home />
            </>
        )
    }
}
