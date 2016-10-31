const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const cssFunctions = require('../src/shared/functions');

const plugins = {
  'no-errors-plugin': new webpack.NoErrorsPlugin(),
  'extract-text-plugin': new ExtractTextPlugin({
    filename: 'css/[name].css',
    allChunks: true
  }),
  'loader-options-plugin': new webpack.LoaderOptionsPlugin({
    options: {
      postcss: {
        plugins: [
          require('postcss-import')(),
          require('postcss-constants')({}),
          require('postcss-at-rules-variables')(),
          require('postcss-functions')({
            functions: cssFunctions
          }),
          require('postcss-mixins')(),
          require('postcss-for'),
          require('postcss-cssnext')()
        ]
      },
      'embed-markdown-loader': {
        mode: 'plain'
      }
    }
  })
};

exports.config = {
  context: path.join(__dirname, '../'),
  output: {
    path: path.join(__dirname, '../static'),
    publicPath: '/',
    filename: 'js/[name].js'
  },
  plugins: [
    plugins['no-errors-plugin'],
    plugins['extract-text-plugin'],
    plugins['loader-options-plugin']
  ],
  resolveLoader: {
    alias: {
      'embed-markdown-loader': path.join(__dirname, './embed-markdown-loader')
    }
  },
  module: {
    loaders: [{
      test: /js?$/,
      exclude: /node_modules/,
      include: [
        path.join(__dirname, '../src'),
        path.join(__dirname, '../docs')
      ],
      loader: 'babel'
    }, {
      test: /\.json?$/,
      exclude: /node_modules/,
      include: [
        path.join(__dirname, '../src'),
        path.join(__dirname, '../docs')
      ],
      loader: 'json'
    }, {
      test: /\.md?$/,
      exclude: /node_modules/,
      include: [
        path.join(__dirname, '../src'),
        path.join(__dirname, '../docs')
      ],
      loader: 'raw-loader!embed-markdown-loader'
    }, {
      test: /\.css?$/,
      exclude: /node_modules/,
      include: [
        path.join(__dirname, '../src'),
        path.join(__dirname, '../docs')
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
    }]
  }
};

exports.plugins = plugins;
