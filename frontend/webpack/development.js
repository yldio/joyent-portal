// const graphql = require('../../cloudapi-graphql/src/endpoint');
const plugins = require('./plugins');
const base = require('./base');

const devServer = {
  hot: true,
  compress: true,
  lazy: false,
  publicPath: base.output.publicPath,
  setup: (app) => {
    // app.use('/graphql', graphql);
  },
  historyApiFallback: {
    index: './static/index.html'
  }
};

module.exports = Object.assign(base, {
  devtool: 'eval-source-map',
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    base.entry
  ],
  plugins: base.plugins.concat([
    plugins['named-modules'],
    plugins['hot-module-replacement']
  ]),
  devServer
});
