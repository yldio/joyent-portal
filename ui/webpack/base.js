const gracefulFs = require('graceful-fs');
const path = require('path');
const fs = require('fs');

const plugins = require('./plugins');

const CONTEXT = path.join(__dirname, '../');
const STATIC = path.join(__dirname, '../static');
const SRC = path.join(__dirname, '../src');
const DOCS = path.join(__dirname, '../docs');

// PATCH `fs` to avoid ENFILE errors
gracefulFs.gracefulify(fs);

module.exports = {
  devtool: 'eval',
  context: CONTEXT,
  entry: path.join(SRC, 'index.js'),
  output: {
    path: STATIC,
    publicPath: '/',
    filename: '[name].js'
  },
  plugins: [
    plugins['no-errors'],
    plugins['extract-text'],
    plugins['loader-options']
  ],
  module: {
    loaders: [{
      test: /js?$/,
      exclude: /node_modules/,
      include: [
        SRC,
        DOCS
      ],
      loader: 'babel-loader'
    }, {
      test: /\.json?$/,
      exclude: /node_modules/,
      include: [
        SRC,
        DOCS
      ],
      loader: 'json-loader'
    }]
  }
};
