const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin");

// 根路径
let rootUrl = path.resolve(__dirname, '..')


/**
 * 获取入口文件地址
 * @param { string } filename 
 */
let entryUrl = filename => path.resolve(rootUrl, 'src', 'pages', filename)

// const isEnvDevelopment = webpackEnv === 'development';
// const isEnvProduction = webpackEnv === 'production';

module.exports = {
    entry: {
        blog: entryUrl('blog'),
        mgr: entryUrl('mgr'),
    },
    output: {
        path: path.resolve(rootUrl, 'dist'),
        filename: 'javascripts/[name].[chunkhash].js',
        chunkFilename: 'javascripts/[name].[chunkhash].js',
    },
    module: {
        rules: [{
            test: /\.tsx?$/,
            loader: "awesome-typescript-loader"

        }, {
            test: /\.js$/,
            loader: "source-map-loader",
            enforce: "pre",
        }, {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: "css-loader"
            })
        },
        // {
        //     test: /\.less$/,
        //     loader: 'style-loader!css-loader!less-loader'
        // },
        {
            test: /\.(png|svg|jpg|gif)/,
            use: 'file-loader'
        }
        ]
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"],
        alias: {
            '@components': path.resolve(rootUrl, 'src', 'components'),
            '@utils': path.resolve(rootUrl, 'src', 'utils'),
            '@models': path.resolve(rootUrl, 'src', 'models'),
        },
    },
    // externals: {
    //     "react": "React",
    //     "react-dom": "ReactDOM"
    // },
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