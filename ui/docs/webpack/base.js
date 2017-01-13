const path = require('path');

const plugins = require('./plugins');

const CONTEXT = path.join(__dirname, '../../');
const STATIC = path.join(__dirname, '../static');
const DOCS = path.join(CONTEXT, 'docs');
const NODE_MODULES = path.join(DOCS, 'node_modules');
const SRC = path.join(CONTEXT, 'src');

const MODULES = [
  path.join(DOCS, 'node_modules'),
  path.join(CONTEXT, 'node_modules')
];

const INCLUDE = [
  DOCS,
  SRC
];

module.exports = {
  context: CONTEXT,
  entry: './docs/src/index.js',
  resolveLoader: {
    alias: {
      'embed-markdown-loader': path.join(__dirname, './embed-markdown-loader'),
      'babel-loader': path.join(NODE_MODULES, 'babel-loader'),
      'json-loader': path.join(NODE_MODULES, 'json-loader'),
      'raw-loader': path.join(NODE_MODULES, 'raw-loader')
    }
  },
  resolve: {
    modules: MODULES,
    alias: {
      '@root': path.join(DOCS, 'src'),
      '@ui': SRC
    }
  },
  output: {
    path: STATIC,
    publicPath: '/',
    filename: '[name].js'
  },
  plugins: [
    plugins['named-modules'],
    plugins['no-errors'],
    plugins['loader-options'],
    plugins['define']
  ],
  module: {
    rules: [{
      test: /js?$/,
      exclude: [/node_modules/g],
      include: INCLUDE,
      loader: 'babel-loader'
    }, {
      test: /\.json?$/,
      exclude: [/node_modules/g],
      include: INCLUDE,
      loader: 'json-loader'
    }, {
      test: /\.md?$/,
      exclude: [/node_modules/g],
      include: INCLUDE,
      loader: 'raw-loader!embed-markdown-loader'
    },
    {
      test: /\.(eot|svg|ttf|woff|woff2)$/,
      exclude: /node_modules/,
      loader: 'file-loader',
      include: INCLUDE
    }]
  }
};
