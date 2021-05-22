const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const StyleLintPlugin = require('stylelint-webpack-plugin')
const nodeExternals = require('webpack-node-externals')

module.exports = {
  entry: {
    main: './src/index.js' // For typescript: index.tsbabel/preset-env
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].bundle.js',
    assetModuleFilename: 'assets/[name]-[contenthash][ext][query]',
    publicPath: '',
    clean: true,
  },
  module: {
    rules: [{
        test: /\.(js|jsx)$/i,
        exclude: /[\\/](node_modules|bower_components)[\\/]/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            plugins: ['@babel/plugin-transform-runtime'],
          }
        },
      },
      {
        test: /\.ts(x)?$/i,
        exclude: /[\\/](node_modules|bower_components)[\\/]/,
        use: [{
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              // presets: [
              //   ['@babel/preset-env', {
              //     targets: "defaults"
              //   }]
              // ],
              plugins: ['@babel/plugin-transform-runtime'],
            }
          },
          'ts-loader'
        ],
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /\.txt/,
        type: 'asset/source',
      },
      {
        test: /\.(ico|jpe?g|png|webp|gif|tif|svg|avif|mp3|mp4|mov|avi|flv|wmv|mov|webm|mkv)(\?.*)?$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff(2)?|ttf|eot|otf)(\?v=\d+\.\d+\.\d+)?$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name]-[contenthash][ext][query]'
        }
      },
      {
        test: /\.(csv|tsv)$/i,
        use: ['csv-loader'],
      },
      {
        test: /\.xml$/i,
        use: ['xml-loader'],
      },
      {
        resourceQuery: /raw/,
        type: 'asset/source',
      },
    ]
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      hash: true,
      scriptLoading: 'defer',
      // title: 'Webpack 5 boilerplate',
      // favicon: './src/assets/favicon.ico',
    }),
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        openAnalyzer: false,
      }),
    new StyleLintPlugin({
      configFile: './stylelint.config.js',
      files: './src/styles/*.scss',
      syntax: 'scss'
    })
  ],
  optimization: {
    usedExports: true,
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        chunks: 'all',
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        },
        commons: {
          name: 'js/[name].bundle.js',
          test: /[\\/]node_modules[\\/]/,
          minChunks: 2
        }
      }
    }
  },
  // externals: [nodeExternals()], //Bundler completely ignores node_modules
  resolve: {
    extensions: [
      '.tsx',
      '.ts',
      '.mjs',
      '.jsx',
      '.js',
      '.json',
      '.scss',
      '.sass',
      '.sass'
    ]
  }
}
