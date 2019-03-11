const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin");

// 根路径
let rootUrl = path.resolve(__dirname, '..')

const apiMocker = require('webpack-api-mocker');
const mocker = path.resolve(rootUrl, 'mock', 'index.js');

/**
 * 获取入口文件地址
 * @param { string } filename 
 */
let entryUrl = filename => path.resolve(rootUrl, 'src', 'pages', filename, 'index.js')

module.exports = {
    entry: {
        blog: entryUrl('blog'),
        mgr: entryUrl('mgr'),
    },
    output: {
        path: path.resolve(rootUrl, 'dist'),
        filename: 'javascripts/[name].[chunkhash].js'
    },
    devServer: {
        contentBase: './dist',
        // proxy: {
        //     "/api": "http://localhost:3000"
        // },
        before(app, server) {
            apiMocker(app, mocker)
        }
    },
    module: {
        rules: [{
            test: /\.(js|jsx)/,
            exclude: /node_modules/,
            use: 'babel-loader'
        }, {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: "css-loader"
            })
        }, {
            test: /\.(png|svg|jpg|gif)/,
            use: 'file-loader'
        }]
    },
    resolve: {
        // 匹配文件类型优先权
        extensions: ['.jsx', '.js', '.json'],
        // 这样在项目中调用组件时就不用写过多的 '../..' 来定位相对路径
        // 可以直接 '@components/components.js' 来调用
        alias: {
            '@components': path.resolve(rootUrl, 'src', 'components'),
            '@untils': path.resolve(rootUrl, 'src', 'untils'),
            // '@API': path.resolve(rootUrl, 'src', 'APIPath'),
        },
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'blog',
            template: './src/pages/blog/index.html', // 模板路径
            filename: './pages/blog.html', // 输出html文件名称
            inject: 'body',
            chunks: ['blog']
        }),
        new HtmlWebpackPlugin({
            title: 'mgr',
            template: './src/pages/blog/index.html', // 模板路径
            filename: './pages/mgr.html', // 输出html文件名称
            inject: 'body',
            chunks: ['mgr']
        }),
        new ExtractTextPlugin("styles/[name].css"),
    ]
}