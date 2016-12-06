const base = require('./base');
const plugins = require('./plugins');
const path = require('path');

const STATIC = path.join(__dirname, '../static');

const devServer = {
  contentBase: [
    STATIC
  ],
  hot: true,
  compress: true,
  lazy: false,
  historyApiFallback: {
    index: './index.html'
  }
};

module.exports = Object.assign(base, {
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    './docs/src/index.js'
  ],
  plugins: base.plugins.concat([
    plugins['hot-module-replacement']
  ]),
  devServer
});
