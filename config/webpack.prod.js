// let merge = require('merge')
let base = require('./webpack.base')

let CleanWebpackPlugin = require('clean-webpack-plugin')

base.plugins.push(new CleanWebpackPlugin())

// base.externals = {
//     "react": "React",
//     "react-dom": "ReactDOM"
// }
module.exports = base