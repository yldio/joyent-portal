const graphql = require('../../cloudapi-graphql/src/endpoint');
const config = require('./config.js');
const webpack = require('webpack');

const devServer = {
  hot: true,
  compress: true,
  lazy: false,
  publicPath: config.output.publicPath,
  setup: (app) => {
    app.use('/graphql', graphql);
  },
  historyApiFallback: {
    index: './static/index.html'
  }
};

module.exports = Object.assign(config, {
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    './index.js'
  ],
  plugins: config.plugins.concat([
    new webpack.HotModuleReplacementPlugin()
  ]),
  devtool: 'source-map',
  devServer
});
