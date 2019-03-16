const CleanWebpackPlugin = require('clean-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

let base = require('./webpack.base')

base.plugins.push(new CleanWebpackPlugin())
base.plugins.push(new OptimizeCssAssetsPlugin())

base.optimization.minimizer.push(new UglifyJsPlugin())
module.exports = base