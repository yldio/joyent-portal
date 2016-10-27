var calc = require('postcss-calc');

module.exports = function (postcss) {
  return postcss([
      require('postcss-at-rules-variables')(),
      require('postcss-modules-values'),
      require('postcss-mixins')(),
      require('postcss-for'),
      require('postcss-cssnext')(),
   ])
}
