const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: [ '@babel/polyfill', './src/index.js' ],
  output: {
    filename: 'js/bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: './'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-env']
        }
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
                loader: 'css-loader',
                options: {
                    minimize: true,
                    sourceMap: true
                }
            },
            {
                loader: 'resolve-url-loader',
            },
            {
                loader: 'sass-loader?sourceMap',
                options: {
                    sourceMap: true
                }
            }
          ]
        })
      },
      {
        test: /\.(ico|jpg|jpeg|png|gif|svg)(\?.*)?$/,
        loader: 'file-loader',
        options: {
          publicPath: './images',
          name: 'images/[name].[ext]',
          limit: 10000
        }
      }
      // { // run "npm i -D truffle-solidity-loader" if needed and don't forget to add a "," to the line above
      //   test: /\.sol/,
      //   loader: 'truffle-solidity'
      // }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new ExtractTextPlugin({
      filename: 'styles/bundle.css'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new CopyPlugin([
      { context: './src/images/', from: '**/*', to: 'images/' }
    ])
  ],
  devServer: {
    compress: true,
    contentBase: path.join(__dirname, 'dist'),
    historyApiFallback: true,
    hot: true
  }
};
