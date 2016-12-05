const path = require('path');

const plugins = require('./plugins');
const base = require('./base');
const entries = require('./entrypoints');

const SRC = path.join(__dirname, '../src');

module.exports = Object.assign(base, {
  output: Object.assign(base.output, {
    libraryTarget: 'commonjs2'
  }),
  entry: entries.filter((entry) => {
    return entry.name !== 'docs';
  }).reduce((all, entry) => {
    all[entry.name] = [`./${path.relative(base.context, entry.path)}`];
    return all;
  }, {}),
  plugins: base.plugins.concat([
    plugins['occurrence-order'],
    plugins['aggressive-merging'],
    plugins['uglify-js']
  ]),
  module: Object.assign(base.module, {
    loaders: base.module.loaders.concat([{
      test: /\.css?$/,
      exclude: /node_modules/,
      include: [
        SRC
      ],
      loader: [
        'style-loader!',
        'css-loader?',
        'modules&importLoaders=1&',
        'localIdentName=[name]__[local]___[hash:base64:5]!',
        'postcss-loader'
      ].join('')
    }])
  })
});

/*
 * Maybe add in the future:
 * - https://github.com/lettertwo/appcache-webpack-plugin
 * - https://github.com/NekR/offline-plugin
 * - https://github.com/goldhand/sw-precache-webpack-plugin
 * - https://github.com/Klathmon/imagemin-webpack-plugin
 */
