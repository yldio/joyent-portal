const base = require('./base');
const plugins = require('./plugins');

module.exports = {
  context: base.context,
  resolve: base.resolve,
  resolveLoader: base.resolveLoader,
  output: Object.assign(base.output, {
    libraryTarget: 'commonjs2',
  }),
  plugins: [
    plugins['named-modules'](),
    plugins['no-errors'](),
    plugins['define']()
  ],
  module: base.module
};
