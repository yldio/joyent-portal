const pkg = require('../package.json');
const webpack = require('webpack');
const WebpackShellPlugin = require('webpack-shell-plugin');
const path = require('path');

module.exports = {
  context: path.join(__dirname, '../src'),
  output: {
    path: path.join(__dirname, '../static'),
    publicPath: '/static/',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env['NODE_ENV'] || 'development'),
        APP_NAME: JSON.stringify(pkg.name),
        APP_VERSION: JSON.stringify(pkg.version)
      }
    }),
    new WebpackShellPlugin({
      onBuildStart: ['npm run build-locales']
    })
  ],
  module: {
    loaders: [{
      test: /js?$/,
      exclude: /node_modules/,
      include: [
        path.join(__dirname, '../src')
      ],
      loaders: ['babel']
    }, {
      test: /\.json?$/,
      exclude: /node_modules/,
      include: [
        path.join(__dirname, '../src')
      ],
      loaders: ['json']
    }]
  }
};
