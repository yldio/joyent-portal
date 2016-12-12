const path = require('path');
const fs = require('fs');

const plugins = require('./plugins');
const CONTEXT = path.join(__dirname, '../src');
const STATIC = path.join(__dirname, '../static');
const ROOT = path.join(__dirname, '../..');

module.exports = {
  context: CONTEXT,
  resolve: {
    modules: [
      ROOT,
      'node_modules'
    ],
    alias: fs.readdirSync(CONTEXT)
      .map((name) => path.join(CONTEXT, name))
      .filter((fullpath) => fs.statSync(fullpath).isDirectory())
      .reduce((aliases, fullpath) => Object.assign(aliases, {
        [`@${path.basename(fullpath)}`]: fullpath
      }), {
        '@root': CONTEXT
      })
  },
  output: {
    path: STATIC,
    publicPath: '/static/',
    filename: '[name].js'
  },
  plugins: [
    plugins['no-errors'],
    plugins['define'],
    plugins['shell']
  ],
  module: {
    loaders: [{
      test: /js?$/,
      exclude: /node_modules/,
      include: [CONTEXT],
      loaders: ['babel-loader']
    }, {
      test: /\.json?$/,
      exclude: /node_modules/,
      include: [CONTEXT],
      loaders: ['json-loader']
    }]
  }
};
