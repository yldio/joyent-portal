const graphql = require('../../cloudapi-graphql/src/endpoint');
const base = require('./base.js');
const webpack = require('webpack');

const devServer = {
  hot: true,
  compress: true,
  lazy: false,
  publicPath: base.config.output.publicPath,
  setup: (app) => {
    app.use('/graphql', graphql);
  },
  historyApiFallback: {
    index: './static/index.html'
  }
};

module.exports = Object.assign(base.config, {
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    './index.js'
  ],
  plugins: base.config.plugins.concat([
    new webpack.HotModuleReplacementPlugin()
  ]),
  devtool: 'source-map',
  devServer
});
