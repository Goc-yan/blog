let merge = require('merge')
let base = require('./webpack.base')

// 根路径
let rootUrl = path.resolve(__dirname, '..')

const apiMocker = require('webpack-api-mocker');
const mocker = path.resolve(rootUrl, 'mock', 'index.js');

base.devtool = 'source-map'
base.devServer = {
    contentBase: './dist',
    // proxy: {
    //     "/api": "http://localhost:3000"
    // },
    before(app, server) {
        apiMocker(app, mocker)
    }
}


module.exports = base