const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

module.exports = {
  context: path.join(__dirname, '../'),
  output: {
    path: path.join(__dirname, '../static'),
    publicPath: '/static/',
    filename: '[name].js'
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin({
      filename: '[name].css',
      allChunks: true
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: {
          plugins: () => {
            return [
              require('postcss-cssnext')
            ];
          }
        },
        'embed-markdown-loader': {
          // webpackConfigFullpath: path.join(__dirname, 'index.js') don't detach yet (has a bug in the production config)
        }
      }
    })
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
      loader: 'html-loader!embed-markdown-loader'
    }, {
      test: /\.css?$/,
      exclude: /node_modules/,
      include: [
        path.join(__dirname, '../src'),
        path.join(__dirname, '../docs')
      ],
      loader: ExtractTextPlugin.extract({
        fallbackLoader: 'style-loader',
        loader: 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader'
      })
    }]
  }
};
