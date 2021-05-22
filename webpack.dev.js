const path = require('path')
const { merge } = require('webpack-merge')
const webpack = require('webpack')
const commonConfig = require('./webpack.config.common')

module.exports = merge(commonConfig, {
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    historyApiFallback: true,
    open: true,
    compress: false,
    hot: true,
    port: 8080,
  },
  module: {
    rules: [
            {
              test: /\.css$/,
              use: [
                'style-loader',
                {
                  loader: 'css-loader',
                  options: {
                    importLoaders: 1
                  }
                },
                'postcss-loader',
              ]
            },
            {
              test: /\.((sa|sc)ss)$/i,
              use: [
                'style-loader',
                'css-loader',
                'postcss-loader',
                'resolve-url-loader',
                'sass-loader',
              ]
            },
          {
            test: /\.less$/,
            use: [
              'style-loader',
              'css-loader',
              'postcss-loader',
              'resolve-url-loader',
              'less-loader'
            ]
          },
          {
            test: /\.styl$/,
            use: [
              'style-loader',
              'css-loader',
              'postcss-loader',
              'resolve-url-loader',
              'stylus-loader'
            ]
          },
        ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  performance: {
    // hints: 'warning',
  },
})
