const path = require('path')
const { merge } = require('webpack-merge')
const commonConfig = require('./webpack.config.common')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const SitemapPlugin = require('sitemap-webpack-plugin').default
const RobotstxtPlugin = require('robotstxt-webpack-plugin');

module.exports = merge(commonConfig, {
  mode: 'production',
  devtool: 'hidden-source-map', // Alternatively: source-map
  output: {
  filename: 'js/[name].[contenthash].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../',
            },
          },
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
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../',
            },
          },
          'css-loader',
          'postcss-loader',
          'resolve-url-loader',
          'sass-loader',
        ]
      },
    {
      test: /\.less$/,
      use: [
        {
          loader: MiniCssExtractPlugin.loader,
          options: {
            publicPath: '../',
          },
        },
        'css-loader',
        'postcss-loader',
        'resolve-url-loader',
        'less-loader'
      ]
    },
    {
      test: /\.styl$/,
      use: [
        {
          loader: MiniCssExtractPlugin.loader,
          options: {
            publicPath: '../',
          },
        },
        'css-loader',
        'postcss-loader',
        'resolve-url-loader',
        'stylus-loader'
      ]
    },
    ],
  },
  plugins: [
    new CompressionPlugin(),
    new MiniCssExtractPlugin({
      filename: 'styles/[name]-[contenthash].css',
      chunkFilename: 'styles/[id]-[contenthash].css'
    }),
    new SitemapPlugin({
      base: 'http://localhost:8080', // Change to your domain name / webserver IP
      paths: [{
        path: '/index.html'
      }],
      options: {
        fileName: 'sitemap.xml',
        lastMod: true,
        changeFreq: 'never',
        skipgzip: true,
      }
    }),
    new RobotstxtPlugin({
      sitemap: 'https://localhost:8080/sitemap.xml', // Change to your domain name / webserver IP
      host: 'https://localhost:8080'
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true
      }),
      new CssMinimizerPlugin(),
    ],
    runtimeChunk: {
      name: 'runtime',
    }
  },
  performance: {
    hints: 'error',
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  }
})
