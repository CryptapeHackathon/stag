const webpack = require('webpack')
const path = require('path')

module.exports = {
  output: {
    path: path.resolve(__dirname, '../public'),
    // publicPath: '/public/dist/',
    filename: 'scripts/[name]-[hash:5].js',
    chunkFilename: 'scripts/[name]-[hash:5].js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.(jpg|png|svg|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 8129,
          name: 'images/[name].[ext]',
        },
      },
      {
        test: /\.(otf|woff|woff2|ttf)$/,
        loader: 'file-loader',
        options: {
          mimetype: 'application/font-woff',
          name: 'fonts/[name].[ext]',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.scss'],
  },
}
