const graphql = require('../../cloudapi-graphql/src/endpoint');
const base = require('./base.js');
const entries = require('./entrypoints');
const webpack = require('webpack');

const devServer = {
  hot: true,
  compress: true,
  lazy: false,
  publicPath: '/static/',
  setup: (app) => {
    app.use('/graphql', graphql);
  },
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
    new webpack.HotModuleReplacementPlugin()
  ]),
  devtool: 'source-map',
  devServer
});
