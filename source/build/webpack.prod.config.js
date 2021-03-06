const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OfflinePlugin = require('offline-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

const baseWebpackConfig = require('./webpack.base.config');
const config = require('../config')
;

const projectRoot = path.resolve(__dirname, '../');

const HappyPack = require('happypack');
const os = require('os');

const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const proWebpackConfig = merge(baseWebpackConfig, {
  devtool: config.build.productionSourceMap ? '#source-map' : false,
  output: {
    path: config.build.assetsRoot,
    filename: path.join(config.build.assetsSubDirectory, '[name].[chunkhash:4].js'),
    chunkFilename: path.join(config.build.assetsSubDirectory, 'chunk[id].[chunkhash:4].js')
  },
  entry: {
    app: config.entry,
    vendor: ['react', 'react-router-dom', 'moment', 'antd'],
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: [
            { loader: 'css-loader', options: { sourceMap: false } },
            { loader: 'sass-loader', options: { sourceMap: false } }
          ],
        }),
        include: projectRoot,
        exclude: /node_modules/
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          use: [
            { loader: 'css-loader', options: { sourceMap: false } },
            { loader: 'less-loader', options: { sourceMap: false } }
          ],
        }),
        include: projectRoot,
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: [
            { loader: 'css-loader', options: { sourceMap: false } },
          ],
        }),
        include: projectRoot,
        exclude: /node_modules/
      },
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      mangle: {
        screw_ie8: true,
        keep_fnames: true
      },
      compress: {
        warnings: false,
        screw_ie8: true,
        drop_console: true, // console
        pure_funcs: ['console.log'] // 移除console
      },
      comments: false
    }),
    new HappyPack({
      id: 'babel',
      threadPool: happyThreadPool,
      cache: true,
      loaders: [
        {
          loader: 'babel-loader',
          query: {
            cacheDirectory: path.resolve(__dirname, './.cache')
          }
        }
      ]
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: path.join(config.build.assetsSubDirectory, 'vendor-[hash].min.js'),
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
      'process.env.API_ROOT': JSON.stringify('build')
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new ExtractTextPlugin({
      filename: path.join(config.build.assetsSubDirectory, '[name].[contenthash:4].css'),
      allChunks: true,
      disable: false,
    }),
    new HtmlWebpackPlugin({
      filename: config.build.index,
      template: './index.html',
      inject: true, // script 放在body下
      minify: {
        removeComments: true, // 去除注释
        collapseWhitespace: true, // 压缩index代码
        removeAttributeQuotes: true // 不影响代码的情况下去除属性的引号
      }
    }),
    new OfflinePlugin(),
    new FaviconsWebpackPlugin({
      // Your source logo
      logo: config.logo,
      // The prefix for all image files (might be a folder or a name)
      prefix: path.join(config.build.assetsSubDirectory, 'icons/'),
      // Emit all stats of the generated icons
      emitStats: false,
      // The name of the json containing all favicon information
      statsFilename: 'iconstats-[hash].json',
      // Generate a cache file with control hashes and
      // don't rebuild the favicons until those hashes change
      persistentCache: true,
      // Inject the html into the html-webpack-plugin
      inject: true,
      // favicon background color (see https://github.com/haydenbleasel/favicons#usage)
      background: 'transparent',
      // favicon app title (see https://github.com/haydenbleasel/favicons#usage)
      title: config.title,
      // which icons should be generated (see https://github.com/haydenbleasel/favicons#usage)
      icons: {
        android: false,
        appleIcon: false,
        appleStartup: false,
        coast: false,
        favicons: true,
        firefox: true,
        opengraph: false,
        twitter: false,
        yandex: false,
        windows: false
      }
    }),
    // new BundleAnalyzerPlugin({
    //   analyzerMode: 'static',
    // })
  ]
});

module.exports = proWebpackConfig;
