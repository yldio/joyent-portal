// const graphql = require('../../cloudapi-graphql/src/endpoint');
const plugins = require('./plugins');
const base = require('./base');
const paths = require('./paths');

const {
  FRONTEND,
  UI,
  ESLINT
} = paths;

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
  module: {
    rules: base.module.rules.concat([{
      test: /js?$/,
      enforce: 'pre',
      use: [{
        loader: 'eslint-loader',
        options: {
          configFile: ESLINT
        }
      }],
      include: [
        FRONTEND,
        UI
      ]
    }])
  },
  plugins: base.plugins.concat([
    plugins['hot-module-replacement'](),
    plugins['watch-missing-node-modules']()
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
