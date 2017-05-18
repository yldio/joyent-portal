const base = require('./base.js');
const webpack = require('webpack');
const path = require('path');

const devServer = {
  contentBase: [
    path.join(__dirname, '../static/')
  ],
  hot: true,
  compress: true,
  lazy: false,
  historyApiFallback: {
    index: './index.html'
  }
};

module.exports = Object.assign(base.config, {
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    './src/index.js'
  ],
  plugins: base.config.plugins.concat([
    new webpack.HotModuleReplacementPlugin()
  ]),
  devtool: 'source-map',
  devServer
});
