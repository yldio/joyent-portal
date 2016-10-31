const pkg = require('../package.json');
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
  entry: {
    docs: [
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://localhost:8080',
      'webpack/hot/only-dev-server',
      './docs/index.js'
    ]
  },
  plugins: base.config.plugins.concat([
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
        APP_NAME: JSON.stringify(pkg.name),
        APP_VERSION: JSON.stringify(pkg.version)
      }
    })
  ]),
  devtool: 'source-map',
  devServer
});
