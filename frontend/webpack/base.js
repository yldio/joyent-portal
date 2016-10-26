const ExtractTextPlugin = require('extract-text-webpack-plugin');
const pkg = require('../package.json');
const webpack = require('webpack');
const WebpackShellPlugin = require('webpack-shell-plugin');
const path = require('path');

const plugins = {
  'no-errors-plugin': new webpack.NoErrorsPlugin(),
  'extract-text-plugin': new ExtractTextPlugin({
    filename: 'bundle.css',
    allChunks: true
  }),
  'loader-options-plugin': new webpack.LoaderOptionsPlugin({
    options: {
      postcss: {
        plugins: [
          require('postcss-modules-values'),
          require('postcss-cssnext')()
        ]
      }
    }
  }),
  'define-plugin': new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
      APP_NAME: JSON.stringify(pkg.name),
      APP_VERSION: JSON.stringify(pkg.version)
    }
  }),
  'shell-plugin': new WebpackShellPlugin({
    onBuildStart: ['npm run build-locales']
  })
};

exports.config = {
  context: path.join(__dirname, '../src'),
  output: {
    path: path.join(__dirname, '../static'),
    publicPath: '/static/',
    filename: 'bundle.js'
  },
  plugins: [
    plugins['no-errors-plugin'],
    plugins['extract-text-plugin'],
    plugins['loader-options-plugin'],
    plugins['define-plugin'],
    plugins['shell-plugin']
  ],
  module: {
    loaders: [{
      test: /js?$/,
      exclude: /node_modules/,
      include: [
        path.join(__dirname, '../src')
      ],
      loaders: ['babel']
    }, {
      test: /\.json?$/,
      exclude: /node_modules/,
      include: [
        path.join(__dirname, '../src')
      ],
      loaders: ['json']
    }, {
      test: /\.css?$/,
      exclude: /node_modules/,
      include: [
        path.join(__dirname, '../src')
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
