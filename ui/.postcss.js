module.exports = function (postcss) {
  return postcss([
    require('postcss-import')(),
    require('postcss-at-rules-variables')(),
    require('postcss-modules-values'),
    require('postcss-functions')({
      functions: {
        remCalc: function(values) {
          values = values.replace('px', '');
          values = values.split(' ');
          let outputRems = '';
          const base = 16;
          values.forEach( (value, i) => {
            const remValue = value / base;
            outputRems += i === 0 ? `${remValue}rem` : ` ${remValue}rem`;
          });
          return outputRems;
        }
      },
    }),
    require('postcss-mixins')(),
    require('postcss-for'),
    require('postcss-cssnext')()
  ])
}
