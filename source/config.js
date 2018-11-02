const path = require('path');

module.exports = {
  entry: './src/main.js',
  logo: './static/logo.png',
  title: 'BeTime后台管理',
  needPrelint: false,
  build: {
    assetsRoot: path.resolve(__dirname, '../public'),
    index: path.resolve(__dirname, '../public/index.html'),
    assetsSubDirectory: 'static',
    assetsPublicPath: './',
    productionSourceMap: false,
  },
  dev: {
    port: 8000,
    proxy: {
      '/lottery.behe.me/*': {
        target: 'http://demo.lottery.behe.me/',
        secure: false,
        changeOrigin: true,
        pathRewrite: {
          '^/lottery.behe.me/': '/' // 重写接口
        }
      },
      '/uc.behe.me/*': {
        target: 'http://demo.uc.behe.me/',
        secure: false,
        changeOrigin: true,
        pathRewrite: {
          '^/uc.behe.me/': '/' // 重写接口
        }
      },
      '/mall.behe.me/*': {
        target: 'http://demo.mall.behe.me/',
        secure: false,
        changeOrigin: true,
        pathRewrite: {
          '^/mall.behe.me/': '/' // 重写接口
        }
      },
      '/api.admin.behe.me/*': {
        target: 'http://demo.api.admin.behe.me/',
        secure: false,
        changeOrigin: true,
        pathRewrite: {
          '^/api.admin.behe.me/': '/' // 重写接口
        }
      }
    }
  }
};
