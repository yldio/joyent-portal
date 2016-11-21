const webpack = require('webpack');
const path = require('path');

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
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [{
      test: /js?$/,
      exclude: /node_modules/,
      include: [
        path.join(__dirname, '../src')
      ],
      loader: 'babel-loader'
    }]
  }
};

exports.plugins = plugins;
