const WebpackShellPlugin = require('webpack-shell-plugin');
const config = require('./config.js');
const webpack = require('webpack');
const entries = require('./entrypoints');
const path = require('path');

module.exports = Object.assign(config, {
  entry: entries.reduce((all, entry) => {
    all[entry.name] = [entry.path];
    return all;
  }, {}),
  plugins: config.plugins.concat([
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(true),
    new webpack.optimize.UglifyJsPlugin(),
    new WebpackShellPlugin({
      onBuildEnd: [
        'npm run build-docs-static'
      ]
    })
  ]),
  devtool: 'eval'
});

/*
 * Maybe add in the future:
 * - https://github.com/lettertwo/appcache-webpack-plugin
 * - https://github.com/NekR/offline-plugin
 * - https://github.com/goldhand/sw-precache-webpack-plugin
 * - https://github.com/Klathmon/imagemin-webpack-plugin
 */
