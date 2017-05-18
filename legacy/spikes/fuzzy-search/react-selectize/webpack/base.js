const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const plugins = {
  'no-errors-plugin': new webpack.NoErrorsPlugin(),
};

exports.config = {
  context: path.join(__dirname, '../'),
  output: {
    path: path.join(__dirname, '../static'),
    publicPath: '/',
    filename: '[name].js'
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin({
     filename: 'css/[name].css',
     allChunks: true
   }),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: {}
      }
    })
  ],
  module: {
    loaders: [{
      test: /js?$/,
      exclude: /node_modules/,
      include: [
        path.join(__dirname, '../src')
      ],
      loader: 'babel-loader'
    }, {
      test: /\.css?$/,
      exclude: /node_modules/,
      include: [
        path.join(__dirname, '../src'),
        path.join(__dirname, '../docs')
      ],
      loader: ExtractTextPlugin.extract({
        fallbackLoader: 'style-loader',
        loader: [
          'css-loader?',
          'modules&importLoaders=1&',
          'localIdentName=[name]__[local]___[hash:base64:5]!',
          'postcss-loader'
        ].join('')
      })
    }]
  }
};

exports.plugins = plugins;
