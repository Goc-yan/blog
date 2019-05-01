let path = require('path')
let merge = require('webpack-merge')

let base = require('./webpack.base.conf')

const apiMocker = require('webpack-api-mocker');
const mocker = path.resolve(__dirname, '..', 'mock', 'index.js');

const config = require('../config')

let mode = process.env.RUN_MODE



let devServer = merge({
    contentBase: './dist',
    compress: true,
    openPage: 'pages/mgr.html',
}, mode === 'mock'
        ? {
            before(app, server) {
                apiMocker(app, mocker)
            }
        }
        : {
            proxy: {
                '/api': config.baseProxyHost
            },
        })

module.exports = merge(base, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer,
})