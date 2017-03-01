const path = require('path');
const fs = require('fs');

const plugins = require('./plugins');
const paths = require('./paths');

const {
  ROOT,
  MODULES,
  FRONTEND,
  UI,
  STATIC
} = paths;

module.exports = {
  context: ROOT,
  entry: `./${path.relative(ROOT, path.join(FRONTEND, 'index.js'))}`,
  resolve: {
    modules: MODULES,
    alias: fs.readdirSync(FRONTEND)
      .map((name) => path.join(FRONTEND, name))
      .filter((fullpath) => fs.statSync(fullpath).isDirectory())
      .reduce((aliases, fullpath) => Object.assign(aliases, {
        [`@${path.basename(fullpath)}`]: fullpath
      }), {
        '@root': FRONTEND,
        '@ui': UI
      })
  },
  resolveLoader: {
    modules: MODULES
  },
  output: {
    pathinfo: true,
    path: STATIC,
    publicPath: '/static/',
    filename: '[name].js'
  },
  plugins: [
    plugins['define'](),
    plugins['shell'](),
    plugins['named-modules'](),
    plugins['case-sensitive-paths']()

  ],
  module: {
    rules: [{
      loader: 'url-loader',
      exclude: [
        /\.html$/,
        /\.(js|jsx)$/,
        /\.css$/,
        /\.json$/,
        /\.svg$/,
        /\.(eot|svg|ttf|woff|woff2)$/
      ],
      include: [
        FRONTEND,
        UI
      ],
      options: {
        limit: 10000
      }
    }, {
      test: /js?$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      include: [
        FRONTEND,
        UI
      ],
    }, {
      test: /\.(eot|svg|ttf|woff|woff2)$/,
      loader: 'file-loader',
      include: path.join(UI, 'assets', 'fonts')
    }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    }]
  }
};
