const loaderUtils = require('loader-utils');
const parse = require('./parse');
const hl = require('./highlight');

module.exports = function(source) {
  const fn = this.async();

  const config = loaderUtils.getLoaderConfig(this, 'embed-markdown-loader');
  const fullname = loaderUtils.getRemainingRequest(this);
  const mode = config.mode || 'shadow';

  parse({
    mode,
    fullname,
    source,
    config: {
      webpack: {
        instantiated: this._compilation.options,
        fullpath: config.webpackConfigFullpath
      },
      renderer: {
        html: true,
        breaks: true,
        highlight: hl
      }
    }
  }, fn);
};
