// const graphql = require('../../cloudapi-graphql/src/endpoint');
const plugins = require('./plugins');
const base = require('./base');

const devServer = {
  hot: true,
  quiet: true,
  clientLogLevel: 'none',
  compress: true,
  lazy: false,
  publicPath: base.output.publicPath,
  setup: (app) => {
    // app.use('/graphql', graphql);
  },
  historyApiFallback: {
    index: './static/index.html'
  },
  watchOptions: {
    ignored: /node_modules/
  }
};

module.exports = Object.assign(base, {
  devtool: 'cheap-module-source-map',
  entry: [
    'react-dev-utils/webpackHotDevClient',
    base.entry
  ],
  plugins: base.plugins.concat([
    plugins['named-modules'](),
    plugins['hot-module-replacement'](),
    plugins['watch-missing-node-modules'](),
    plugins['case-sensitive-paths']()
  ]),
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },
  performance: {
    hints: false
  },
  devServer
});
