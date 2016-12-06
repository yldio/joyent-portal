const path = require('path');
const fs = require('fs');

const plugins = require('./plugins');
const CONTEXT = path.join(__dirname, '../src');
const ROOT = path.join(__dirname, '../..');

module.exports = {
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
    libraryTarget: 'commonjs2'
  },
  plugins: [
    plugins['no-errors'],
    plugins['loader-options'],
    plugins['define']
  ],
  module: {
    loaders: [{
      test: /\.css?$/,
      loader: 'ignore-loader'
    }]
  }
};
