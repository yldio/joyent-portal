const path = require('path');
const fs = require('fs');

const plugins = require('./plugins');
const paths = require('./paths');

const {
  ROOT,
  MODULES,
  FRONTEND,
  UI,
  STATIC
} = paths;

module.exports = {
  context: ROOT,
  entry: `./${path.relative(ROOT, path.join(FRONTEND, 'index.js'))}`,
  resolve: {
    modules: MODULES,
    alias: fs.readdirSync(FRONTEND)
      .map((name) => path.join(FRONTEND, name))
      .filter((fullpath) => fs.statSync(fullpath).isDirectory())
      .reduce((aliases, fullpath) => Object.assign(aliases, {
        [`@${path.basename(fullpath)}`]: fullpath
      }), {
        '@root': FRONTEND,
        '@ui': UI
      })
  },
  resolveLoader: {
    modules: MODULES
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
      include: [
        FRONTEND,
        UI
      ],
      loaders: ['babel-loader']
    }, {
      test: /\.json?$/,
      exclude: /node_modules/,
      include: [
        FRONTEND,
        UI
      ],
      loaders: ['json-loader']
    }, {
      test: /\.png$/,
      exclude: /node_modules/,
      include: [
        FRONTEND,
        UI
      ],
      loader: 'url-loader',
      query: {
        mimetype: 'image/png'
      }
    }]
  }
};
