const path = require('path');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: [ '@babel/polyfill', './src/index.js' ],
  output: {
    filename: 'js/bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            'presets': [['@babel/preset-env', { 'modules': false, 'targets': { 'node': 6 } }]]
          },
        }
      },
      {
        test: /\.s[c|a]ss$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'resolve-url-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(ico|jpg|jpeg|png|gif|svg)(\?.*)?$/,
        exclude: /node_modules/,
        use: {
          loader: "file-loader",
          options: {
            publicPath: './images',
            name: 'images/[name].[ext]',
            limit: 10000
          }
        }
      },
      {
        test: /\.(woff(2)?|ttf|eot|otf)(\?v=\d+\.\d+\.\d+)?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "fonts/"
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new CopyPlugin([
      { context: './src/images/', from: '**/*', to: 'images/' }
    ]),
    new webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': JSON.stringify('development')
        }
    }),
  ],
  devServer: {
    compress: false,
    contentBase: path.join(__dirname, 'dist'),
    open: true,
    historyApiFallback: true,
    hot: true
  }
};
