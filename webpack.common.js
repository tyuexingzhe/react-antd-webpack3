const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const plugin = new ExtractTextPlugin({
    filename: '[name]-[hash:6].css',
    ignoreOrder: true,
});

module.exports = {
    entry: {
        app: './src/js/app.js',
        //print: './src/print.js' //配置多入口
        vendor: [
            'react',
            'react-dom'
        ]
    },
    output: {
        path: path.resolve(__dirname, 'build')
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'News',
            template: __dirname + '/index.html',
            filename: 'index.html'
        }),
        plugin,
    ],
    module: {
        rules: [{
                test: /\.js|jsx$/,
                enforce: 'pre', // 在babel-loader对源码进行编译前进行lint的检查

                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader',
                  }],
            },
            {//正则匹配后缀.less文件;
                test: /\.less$/,
                //使用html-webpack-plugin插件独立css到一个文件;
                 use: ExtractTextPlugin.extract({
                     use: [{
                            loader : 'css-loader?importLoaders=1',
                           },
                           {
                            loader : 'postcss-loader', //配置参数;
                            options: {
                               plugins: function() {
                                        return [
                                          require('autoprefixer')
                                          ({
                                           browsers: ['ios >= 7.0']
                                         })];
                                  }
                             }
                            },
                           //加载less-loader同时也得安装less;
                          "less-loader"
                         ]
                    })
               },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: plugin.extract({
                    use: [{
                            loader: 'css-loader',
                            options: {
                                // modules: true,
                                minimize: true //css压缩
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: () => [autoprefixer({
                                    browsers: ['iOS >= 7', 'Android >= 4.1',
                                        'last 10 Chrome versions', 'last 10 Firefox versions',
                                        'Safari >= 6', 'ie > 8'
                                    ]
                                })],
                            },
                        }
                    ],
                    fallback: 'style-loader'
                }),
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                exclude: /node_modules/,
                loader: "url-loader?limit=8192&name=images/[name].[hash:6].[ext]",
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.json$/,
                exclude: /node_modules/,
                loader: 'json-loader'
            },
        ]
    }
};