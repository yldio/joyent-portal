const WebpackShellPlugin = require('webpack-shell-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

const cssFunctions = require('../src/shared/functions');
const mixins = path.join(__dirname, '../src/shared/mixins.css');
const pkg = require('../package.json');

module.exports = {
  'occurrence-order': new webpack.optimize.OccurrenceOrderPlugin(true),
  'aggressive-merging': new webpack.optimize.AggressiveMergingPlugin(),
  'hot-module-replacement': new webpack.HotModuleReplacementPlugin(),
  'named-modules': new webpack.NamedModulesPlugin(),
  'no-errors': new webpack.NoErrorsPlugin(),
  'extract-text': new ExtractTextPlugin({
    filename: '[name].css',
    allChunks: true
  }),
  'loader-options': new webpack.LoaderOptionsPlugin({
    options: {
      postcss: {
        plugins: [
          require('postcss-import')(),
          require('postcss-constants')({}),
          require('postcss-at-rules-variables')(),
          require('postcss-functions')({
            functions: cssFunctions
          }),
          require('postcss-mixins')({
            mixinsFiles: mixins
          }),
          require('postcss-for'),
          require('postcss-cssnext')()
        ]
      },
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
  }),
  'shell': new WebpackShellPlugin({
    onBuildEnd: [
      'npm run build-docs-static'
    ]
  })
};