const webpack = require('webpack')
const path = require('path')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const UglifyPlugin = require('uglifyjs-webpack-plugin')
const AutoprefixerPlugin = require('autoprefixer')
const baseConfig = require('./webpack.config.base.js')

const config = {
  entry: {
    app: path.resolve(__dirname, '../src/app.jsx'),
  },
  // devtool: 'inilne-source-map',
  module: {
    rules: [
      {
        test: /\.scss$/,
        // 打包成一个css
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: false,
                importLoaders: 3,
                localIdentName: '[local]__[name]',
                minimize: true,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                sourceMap: false,
                plugins: () => [AutoprefixerPlugin],
              },
            },
            'resolve-url-loader',
            'sass-loader',
          ],
        }),
        include: /src/,
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin('style-[hash:5].css'),
    new UglifyPlugin(),
    new webpack.DefinePlugin({
      '__webpack': {
        env:JSON.stringify('production')
      },
    }),
    new HtmlWebpackPlugin({
      title: 'Cryptape',
      template: path.resolve(__dirname, '../src/templates/index.html'),
      // favicon: path.resolve(__dirname, '../src/img/common/favicon.ico'),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
  ],
  externals: {
    // react: 'React',
    // redux: 'Redux',
    // 'react-router': 'ReactRouter',
    // 'react-router-dom': 'ReactRouterDOM',
    // 'react-dom': 'ReactDOM',
    // 'react-redux': 'ReactRedux',
  },
}

module.exports = merge(baseConfig, config)
