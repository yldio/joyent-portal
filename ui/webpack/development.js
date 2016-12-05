const ExtractTextPlugin = require('extract-text-webpack-plugin');
const plugins = require('./plugins');
const base = require('./base');
const path = require('path');

const EmbedMarkdownLoader = path.join(__dirname, './embed-markdown-loader');
const STATIC = path.join(__dirname, '../static');
const SRC = path.join(__dirname, '../src');
const DOCS = path.join(__dirname, '../docs');

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
  entry: {
    docs: [
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://localhost:8080',
      'webpack/hot/only-dev-server',
      './docs/index.js'
    ]
  },
  resolveLoader: {
    alias: {
      'embed-markdown-loader': EmbedMarkdownLoader
    }
  },
  plugins: base.plugins.concat([
    plugins['named-modules'],
    plugins['hot-module-replacement'],
    plugins['define']
  ]),
  module: Object.assign(base.module, {
    loaders: base.module.loaders.concat([{
      test: /\.md?$/,
      exclude: /node_modules/,
      include: [
        SRC,
        DOCS
      ],
      loader: 'raw-loader!embed-markdown-loader'
    }, {
      test: /\.css?$/,
      exclude: /node_modules/,
      include: [
        SRC,
        DOCS
      ],
      loader: ExtractTextPlugin.extract({
        fallbackLoader: 'style-loader',
        loader: [
          'css-loader?',
          'modules&importLoaders=1&',
          'localIdentName=[name]__[local]___[hash:base64:5]!',
          'postcss-loader'
        ].join('')
      })
    }])
  }),
  devServer
});
