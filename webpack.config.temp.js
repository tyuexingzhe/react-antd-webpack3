const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const BabiliPlugin = require('babili-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const PATHS = {
  app: path.join(__dirname, 'src/js'),
  build: path.join(__dirname, 'build'),
};

const plugin = new ExtractTextPlugin({
  filename: '[name]-[hash:6].css',
  ignoreOrder: true,
});

module.exports = {
  devServer: {
    host: process.env.HOST, // Defaults to `localhost`
    port: 8080, // Defaults to 8080
    compress:true, //服务器压缩
    overlay: {
      errors: true,
      warnings: true,
    },
  },
  devtool: 'source-map',
  //检测出打包文件的大小，若js大于500k则编译不通过，报出警告
  // performance: { 
  //   hints: 'warning', // 'error'
  //   maxEntrypointSize: 500000, // bytes
  //   maxAssetSize: 450000, // bytes
  // },
  entry: {
    app: PATHS.app,
    vendor : ['react']
  },
  output: {
    path: PATHS.build,
    filename: '[name]-[hash:6].js',
  },
  module:{
    rules:[
      {
        test: /\.js$/,
        enforce: 'pre',  // 在babel-loader对源码进行编译前进行lint的检查

        exclude: /node_modules/,
        use: [{
          loader:'babel-loader',
        }],
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: plugin.extract({
          use: {
            loader: 'css-loader',
            options: {
              modules: true,
              minimize: true //css压缩
            },
          },
          fallback : 'style-loader',
        }),
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: __dirname + '/index.html',
      title:'News'
    }),
    plugin,
    //new BabiliPlugin(), //用于es6，生成环境下
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
    }),
    //plugin插入你想删除的路径，注意在生成出来文件之前，他会删除public的文件夹，而不是根据生成的文件来删除对应的文件，如果文件夹中所有的文件都是根据webpack生成的，，所以有什么额外的文件最好别引用这个！！！
    //new CleanWebpackPlugin(['build'])
  ],
};