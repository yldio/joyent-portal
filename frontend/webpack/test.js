const config = require('./config');
const webpack = require('webpack');
const path = require('path');

module.exports = {
  output: {
    libraryTarget: 'commonjs2',
  },
  plugins: [
    config.__plugins['no-errors-plugin'],
    config.__plugins['loader-options-plugin'],
    config.__plugins['define-plugin']
  ],
  module: {
    loaders: [{
      test: /\.css?$/,
      loader: [
        'style-loader', {
          loader: 'css-loader',
          options: {
            modules: true,
            importLoaders: 1
          }
        }, {
          loader: 'postcss-loader',
          options: {
            plugins: function() {
              return [
                require('postcss-cssnext')
              ];
            }
          }
        }
      ]
    }]
  }
};