const path = require('path'),
  webpack = require('webpack'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  ExtractTextPlugin = require('extract-text-webpack-plugin'),
  CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: ['babel-polyfill', './src/js/app.js'],
  output: {
    filename: '/assets/bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist'
  },
  devtool: 'sourcemap',
  module: {
    loaders: [{
      test: /\.(js|jsx)$/,
      exclude: /(node_modules)/,
      loader: 'babel-loader',
      query: {
        presets: ['env']
      }
    }]
  }
}
