const base = require('./base');
const plugins = require('./plugins');

module.exports = {
  resolve: base.resolve,
  output: {
    libraryTarget: 'commonjs2'
  },
  plugins: [
    plugins['named-modules'],
    plugins['no-errors'],
    plugins['define']
  ],
  module: base.module
};
