const path = require('path')
const fs = require('fs')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

// 根路径
let rootUrl = path.resolve(__dirname, '..')

// 读取pages文件夹下所有页面名称
let files = fs.readdirSync(path.resolve(rootUrl, 'src', 'pages'))

/**
 * 获取入口设置
 * @param {*} files 入口文件夹
 */
let getEntry = function (files) {
    var res = {}
    files.forEach(fileName => {
        res[fileName] = path.resolve(rootUrl, 'src', 'pages', fileName)
    })
    return res
}

const isDev = process.env.NODE_ENV === 'dev'


module.exports = {
    entry: getEntry(files),
    output: {
        path: path.resolve(rootUrl, 'dist'),
        filename: 'javascripts/[name].[chunkhash:8].js',
        chunkFilename: 'javascripts/[name].[chunkhash:8].js',
        publicPath: '/',
    },
    module: {
        rules: [{
            test: /\.tsx?$/,
            loader: "awesome-typescript-loader",
            exclude: /node_modules/,
        }, {
            test: /\.js$/,
            loader: "source-map-loader",
            enforce: "pre",
        }, {
            test: /\.(le|sa|sc|c)ss$/,
            use: [
                isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
                'css-loader',
            ]
        }, {
            test: /\.(png|svg|jpg|gif)/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 8192,
                    name: 'images/[name].[hash:7].[ext]'
                }
            }]
        }]
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json", '.png'],
        alias: {
            '@components': path.resolve(rootUrl, 'src', 'components'),
            '@models': path.resolve(rootUrl, 'src', 'models'),
            '@utils': path.resolve(rootUrl, 'src', 'utils'),
            '@assets': path.resolve(rootUrl, 'src', 'assets'),
        },
    },
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM',
        'moment': 'moment',
        'antd': 'antd',
        'highlight.js': 'hljs',
    },
    plugins: [
        ...files.map(fileName => {
            return new HtmlWebpackPlugin({
                name: fileName,
                title: fileName,
                template: `./src/pages/${fileName}/index.html`, // 模板路径
                filename: `./pages/${fileName}.html`, // 输出html文件名称
                inject: false,
                chunks: [fileName]
            })
        }),
        new MiniCssExtractPlugin({
            filename: 'styles/[name].[hash].css',
            chunkFilename: 'styles/[id].[hash].css',
        }),
    ]
}
