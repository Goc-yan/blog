const path = require('path')

const apiMocker = require('webpack-api-mocker');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// 根路径
let rootUrl = path.resolve(__dirname, '..')

const mocker = path.resolve(rootUrl, 'mock', 'index.js');

/**
 * 获取入口文件地址
 * @param { string } filename 
 */
let entryUrl = filename => path.resolve(rootUrl, 'src', 'pages', filename)

let devServer = isDev => isDev ? {
    contentBase: './dist',
    before(app, server) {
        apiMocker(app, mocker)
    }
} : {}

module.exports = function (env, argv) {

    const isDev = argv.mode === 'development'
    const isProd = argv.mode === 'production'


    let config = {
        mode: argv.mode,
        entry: {
            blog: entryUrl('blog'),
            mgr: entryUrl('mgr'),
            FA: entryUrl('FA'),
        },
        output: {
            path: path.resolve(rootUrl, 'dist'),
            filename: 'javascripts/[name].[chunkhash:8].js',
            chunkFilename: 'javascripts/[name].[chunkhash:8].js',
            publicPath: '/',
        },
        devtool: isDev ? 'source-map' : false,
        devServer: devServer(isDev),
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
            extensions: [".ts", ".tsx", ".js", ".json"],
            alias: {
                '@components': path.resolve(rootUrl, 'src', 'components'),
                '@models': path.resolve(rootUrl, 'src', 'models'),
                '@utils': path.resolve(rootUrl, 'src', 'utils'),
            },
        },
        externals: {
            'react': 'React',
            'react-dom': 'ReactDOM',
            'moment': 'moment',
            'antd': 'antd',
            'highlight.js': 'highlight',
        },
        optimization: {
            minimize: isProd,
            minimizer: [
                new UglifyJsPlugin(),
                new OptimizeCSSAssetsPlugin({})
            ],
            splitChunks: {}
        },
        plugins: [
            new HtmlWebpackPlugin({
                name: 'blog',
                title: 'blog',
                template: './src/pages/blog/index.html', // 模板路径
                filename: './pages/blog.html', // 输出html文件名称
                inject: false,
                chunks: ['blog']
            }),
            new HtmlWebpackPlugin({
                name: 'mgr',
                title: 'mgr',
                template: './src/pages/mgr/index.html', // 模板路径
                filename: './pages/mgr.html', // 输出html文件名称
                inject: false,
                chunks: ['mgr']
            }),
            new HtmlWebpackPlugin({
                name: 'FA',
                title: 'Financial management',
                template: './src/pages/FA/index.html', // 模板路径
                filename: './pages/FA.html', // 输出html文件名称
                inject: false,
                chunks: ['FA']
            }),
            new MiniCssExtractPlugin({
                filename: 'styles/[name].[hash].css',
                chunkFilename: 'styles/[id].[hash].css',
            }),
            isProd && new BundleAnalyzerPlugin(),
            isProd && new CleanWebpackPlugin()
        ].filter(Boolean)
    }

    return config
}