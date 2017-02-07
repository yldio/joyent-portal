const plugins = require('./plugins');
const base = require('./base');


module.exports = Object.assign(base, {
  bail: true,
  devtool: 'source-map',
  entry: [
    base.entry
  ],
  plugins: base.plugins.concat([
    plugins['occurrence-order'](),
    plugins['aggressive-merging'](),
    plugins['uglify-js']()
  ]),
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
});

/**
 * Maybe add in the future:
 * - https://github.com/lettertwo/appcache-webpack-plugin
 * - https://github.com/NekR/offline-plugin
 * - https://github.com/goldhand/sw-precache-webpack-plugin
 * - https://github.com/Klathmon/imagemin-webpack-plugin
 **/
