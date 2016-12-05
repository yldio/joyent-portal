const plugins = require('./plugins');
const base = require('./base');


module.exports = Object.assign(base, {
  devtool: 'hidden-source-map',
  entry: [
    './index.js'
  ],
  plugins: base.plugins.concat([
    plugins['named-modules']
    // plugins['occurrence-order'],
    // plugins['aggressive-merging'],
    // plugins['uglify-js']
  ])
});

/*
 * Maybe add in the future:
 * - https://github.com/lettertwo/appcache-webpack-plugin
 * - https://github.com/NekR/offline-plugin
 * - https://github.com/goldhand/sw-precache-webpack-plugin
 * - https://github.com/Klathmon/imagemin-webpack-plugin
 */
