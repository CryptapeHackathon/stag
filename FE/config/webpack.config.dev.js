const webpack = require('webpack')
const path = require('path')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const baseConfig = require('./webpack.config.base.js')

const config = {
  devtool: 'inilne-source-map',
  entry: {
    app: [
      'webpack/hot/only-dev-server',
      'webpack-dev-server/client?http://localhost:8080',
      path.resolve(__dirname, '../src/app.jsx'),
    ],
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: false,
              importLoaders: 3,
            },
          },
          'sass-loader',
        ],
        // 从 js 里抽出放入 header, 插入 js, css 兼容性, 后处理, 路径 cdn , sass
        include: /src/,
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      '__webpack': {
        env:JSON.stringify('development')
      },
    }),
    new HtmlWebpackPlugin({
      title: '开发',
      template: path.resolve(__dirname, '../src/templates/index.html'),
      // favicon: path.resolve(__dirname, '../src/img/common/favicon.ico'),
    }),
  ],
  devServer: {
    host: '0.0.0.0',
    // port: 8,
    hot: true,
    historyApiFallback: true,
    disableHostCheck: true,
    proxy: {
      '/api/v1/*': {
        target: 'http://47.97.171.140:8088/',
        secure: false,
        changeOrigin:true,
      }
    }
  },
}

module.exports = merge(baseConfig, config)
