const config = require('./config');
const webpack = require('webpack');
const path = require('path');

module.exports = {
  output: {
    libraryTarget: 'commonjs2'
  },
  plugins: [
    config.__plugins['no-errors-plugin'],
    config.__plugins['loader-options-plugin']
  ],
  module: {
    loaders: [{
      test: /\.css?$/,
      loader: 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader'
    }]
  }
};