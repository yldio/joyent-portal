const ExtractTextPlugin = require('extract-text-webpack-plugin');
const pkg = require('../package.json');
const webpack = require('webpack');
const WebpackShellPlugin = require('webpack-shell-plugin');

module.exports = {
  'no-errors': new webpack.NoErrorsPlugin(),
  'occurrence-order': new webpack.optimize.OccurrenceOrderPlugin(true),
  'aggressive-merging': new webpack.optimize.AggressiveMergingPlugin(),
  'hot-module-replacement': new webpack.HotModuleReplacementPlugin(),
  'named-modules': new webpack.NamedModulesPlugin(),
  'extract-text': new ExtractTextPlugin({
    filename: 'bundle.css',
    allChunks: true
  }),
  'loader-options': new webpack.LoaderOptionsPlugin({
    options: {
      postcss: {
        plugins: [
          require('postcss-modules-values'),
          require('postcss-cssnext')()
        ]
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
  'shell': new WebpackShellPlugin({
    onBuildStart: ['npm run build-locales']
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

