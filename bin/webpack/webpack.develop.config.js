// development config

const merge = require('webpack-merge');
const webpack = require('webpack');
const commonConfig = require('./webpack.config');

module.exports = merge(commonConfig, {
  entry: [
		'webpack-hot-middleware/client?reload=true',
    'react-hot-loader/patch',
    './index.js' // the entry point of our app
  ],
  devServer: {
    hot: true // enable HMR on the server
  },
  devtool: 'cheap-module-eval-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // enable HMR globally
    new webpack.NamedModulesPlugin(), // prints more readable module names in the browser console on HMR updates
  ],
});
