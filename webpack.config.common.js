const path = require('path')
const webpack = require('webpack')
const CopyPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const PrettierPlugin = require('prettier-webpack-plugin')
// const StylelintPlugin = require('stylelint-webpack-plugin')

module.exports = {
  entry: './src/index.js', // For typescript: index.ts
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      use: {
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          plugins: ['@babel/plugin-transform-runtime']
        }
      },
      exclude: /[\\/]node_modules[\\/]/
    },
    {
      test: /\.ts(x)?$/,
      loader: 'ts-loader',
      exclude: /[\\/]node_modules[\\/]/
    },
    {
     test: /\.txt/,
     type: 'asset',
    }
    {
      test: /\.(ico|jpg|jpeg|png|gif|svg)(\?.*)?$/,
      exclude: /[\\/]node_modules[\\/]/,
      use: {
        loader: 'file-loader',
        options: {
          publicPath: './media',
          name: '[name].[ext]',
          outputPath: 'media/',
          limit: 10000
        }
      }
    },
    {
      test: /\.(woff(2)?|ttf|eot|otf)(\?v=\d+\.\d+\.\d+)?$/,
      type: 'asset/inline',
      exclude: /[\\/]node_modules[\\/]/,
      use: [{
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'fonts/'
        }
      }]
    },
    {
      test: /\.png$/,
      exclude: /[\\/]node_modules[\\/]/,
      use: [{
        loader: 'url-loader',
        options: {
          mimetype: 'image/png'
        }
      }]
    }
    ]
  },
  plugins: [
    new CopyPlugin({
      patterns: [{
        context: './src/media/',
        from: '**/*',
        to: 'media/'
      }]
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, 'src', 'index.html'),
      scriptLoading: 'defer'
    }),
    new CleanWebpackPlugin(),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false,
    }),
    // new StylelintPlugin({
    //   configFile: './stylelint.config.js',
    //   files: './src/styles/*.scss',
    //   syntax: 'scss'
    // }),
    new PrettierPlugin(),
  ],
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  },
  resolve: {
    extensions: [
      '.tsx',
      '.ts',
      '.js',
      '.jsx'
    ]
  }
}
