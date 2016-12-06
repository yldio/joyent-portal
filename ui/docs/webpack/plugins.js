const webpack = require('webpack');
const path = require('path');

const pkg = require('../package.json');

module.exports = {
  'occurrence-order': new webpack.optimize.OccurrenceOrderPlugin(true),
  'aggressive-merging': new webpack.optimize.AggressiveMergingPlugin(),
  'hot-module-replacement': new webpack.HotModuleReplacementPlugin(),
  'named-modules': new webpack.NamedModulesPlugin(),
  'no-errors': new webpack.NoErrorsPlugin(),
  'loader-options': new webpack.LoaderOptionsPlugin({
    options: {
      'embed-markdown-loader': {
        mode: 'plain'
      }
    }
  }),
  'define': new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
      APP_NAME: JSON.stringify(pkg.name),
      APP_VERSION: JSON.stringify(pkg.version)
    }
  }),
  'uglify-js': new webpack.optimize.UglifyJsPlugin({
    sourceMap: true,
    mangle: true,
    output: {
      comments: false,
      indent_level: 2
    }
  })
};
