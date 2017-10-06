const path = require('path');
const webpack = require('webpack');
const Merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CommonConfig = require('./webpack.common.js');

module.exports = Merge(CommonConfig, {
    devtool: 'cheap-module-source-map',
    output: {
        filename: '[name]-[hash:6].js'
    },
    plugins: [
        new CleanWebpackPlugin(['build']),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new webpack.optimize.UglifyJsPlugin()
    ]
});