const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const baseWebpackConfig = require('./webpack.base.config');

const config = require('../config');

const port = process.env.PORT || config.dev.port;

Object.keys(baseWebpackConfig.entry).forEach((name) => {
  baseWebpackConfig.entry[name] = [
    `webpack-dev-server/client?http://localhost:${port}`,
    'webpack/hot/only-dev-server',
    'react-hot-loader/patch',
  ].concat(baseWebpackConfig.entry[name]);
});

module.exports = merge.smart(baseWebpackConfig, {
  cache: true,
  devtool: '#source-map',
  performance: {
    hints: false,
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.API_ROOT': JSON.stringify('dev')
    }),
    new OpenBrowserPlugin({
      url: `http://localhost:${port}`
    }),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true,
    }),
    // new BundleAnalyzerPlugin()
  ]
});
