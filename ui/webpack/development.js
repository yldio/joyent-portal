const pkg = require('../package.json');
const base = require('./base.js');
const entries = require('./entrypoints');
const webpack = require('webpack');

const devServer = {
  hot: true,
  compress: true,
  lazy: false,
  publicPath: '/static/',
  historyApiFallback: {
    index: './static/index.html'
  }
};

module.exports = Object.assign(base.config, {
  entry: entries.reduce((all, entry) => {
    all[entry.name] = [
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://localhost:8080',
      'webpack/hot/only-dev-server',
      entry.path
    ];

    return all;
  }, {}),
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
