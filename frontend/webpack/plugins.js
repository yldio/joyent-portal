const webpack = require('webpack');
const WebpackShellPlugin = require('webpack-shell-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin'); // eslint-disable-line max-len
const path = require('path');

const pkg = require('../package.json');
const paths = require('./paths');

const {
  FRONTEND
} = paths;

module.exports = {
  'manifest': () => new ManifestPlugin({
    fileName: 'asset-manifest.json'
  }),
  'watch-missing-node-modules': () => new WatchMissingNodeModulesPlugin(
    path.join(FRONTEND, 'node_modules')
  ),
  'case-sensitive-paths': () => new CaseSensitivePathsPlugin(),
  'no-errors': () => new webpack.NoEmitOnErrorsPlugin(),
  'occurrence-order': () => new webpack.optimize.OccurrenceOrderPlugin(true),
  'aggressive-merging': () => new webpack.optimize.AggressiveMergingPlugin(),
  'hot-module-replacement': () => new webpack.HotModuleReplacementPlugin(),
  'named-modules': () => new webpack.NamedModulesPlugin(),
  'define': () => new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
      APP_NAME: JSON.stringify(pkg.name),
      APP_VERSION: JSON.stringify(pkg.version)
    }
  }),
  'shell': () => new WebpackShellPlugin({
    onBuildStart: ['npm run build-locales']
  }),
  'uglify-js': () => new webpack.optimize.UglifyJsPlugin({
    sourceMap: true,
    compress: {
      screw_ie8: true,
      warnings: false
    },
    mangle: {
      screw_ie8: true
    },
    output: {
      comments: false,
      indent_level: 2,
      screw_ie8: true
    }
  })
};
