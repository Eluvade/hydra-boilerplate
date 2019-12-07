const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const SitemapPlugin = require('sitemap-webpack-plugin').default;
const RobotsPlugin = require('@tanepiper/robots-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin");
const args = require('yargs').argv;
const build = args.p;
const paths = [
  '/index.html'
];

module.exports = {
  mode: 'production',
  entry: [ '@babel/polyfill', './src/index.js' ],
  output: {
    filename: 'js/bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  cache: false,
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            'plugins': ['lodash'],
            'presets': [['@babel/preset-env', { 'modules': false, 'targets': { 'node': 6 } }]]
          },
        }
      },
      {
        test: /\.s[c|a]ss$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
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
  optimization: {
    minimizer: [new TerserPlugin()],
  },
  plugins: [
    new webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': JSON.stringify('production')
        }
    }),
    new CleanWebpackPlugin,
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.ProgressPlugin(),
    new CompressionPlugin(),
    new MiniCssExtractPlugin({ filename: '/styles/bundle.css'}),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new CopyPlugin([
      { context: './src/images/', from: '**/*', to: 'images/' }
    ]),
    new LodashModuleReplacementPlugin({
      'collections': true,
      'paths': true
    }),
    new SitemapPlugin('http://localhost:8080', paths, {
      fileName: 'map.xml'
    }),
    new RobotsPlugin({
      sitemap: 'http://localhost:8080/map.xml' // Change to your domain name / webserver IP
    }),
    new StyleLintPlugin({
      configFile: './stylelint.config.js',
      files: './src/styles/*.scss',
      syntax: 'scss'
    })
  ],
  devServer: {
    compress: true,
    contentBase: path.join(__dirname, 'dist'),
    open: true,
    historyApiFallback: true,
    hot: true
  }
};
