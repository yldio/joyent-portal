const base = require('./base');
const webpack = require('webpack');
const path = require('path');

module.exports = {
  output: {
    libraryTarget: 'commonjs2'
  },
  plugins: [
    base.plugins['no-errors-plugin'],
    base.plugins['loader-options-plugin']
  ],
  module: {
    loaders: [{
      test: /\.css?$/,
      loader: 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader'
    }]
  }
};