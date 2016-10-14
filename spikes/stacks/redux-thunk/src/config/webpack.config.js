const webpack = require('webpack');
const path = require('path');

module.exports = {
  debug: true,
  devtool: 'eval',
  context: path.join(__dirname, '../client'),
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    'react-hot-loader/patch',
    './index.js'
  ],
  output: {
    path: path.join(__dirname, '../../static'),
    publicPath: '/static/',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [{
      test: /js?$/,
      exclude: /node_modules/,
      include: [
        path.join(__dirname, '../client')
      ],
      loaders: ['babel']
    }, {
      test: /\.json?$/,
      exclude: /node_modules/,
      include: [
        path.join(__dirname, '../client'),
        path.join(__dirname, '../../') // for package.json
      ],
      loaders: ['json']
    }]
  }
};
