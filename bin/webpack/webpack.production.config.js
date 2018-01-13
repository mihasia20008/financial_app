// production config

const webpack = require('webpack');
const merge = require('webpack-merge');
const { resolve } = require('path');

const commonConfig = require('./webpack.config');

module.exports = merge(commonConfig, {
    entry: './index.js',
    devtool: 'source-map',
    output: {
        filename: 'js/bundle.[hash].min.js',
        path: resolve(__dirname, '../../dist'),
        publicPath: '/',
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
    ],
});
