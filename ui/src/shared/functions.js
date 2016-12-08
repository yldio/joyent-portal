const calc = require('reduce-css-calc');

module.exports = {
  remcalc: function(values) {
    values = values.toString().replace('px', '').split(' ');

    let outputRems = '';
    const base = 16;

    values.forEach( (value, i) => {
      const remValue = value / base;
      outputRems += i === 0 ? `${remValue}rem` : ` ${remValue}rem`;
    });

    return outputRems;
  },
  calc: function(str) {
    return calc(`calc(${str})`);
  }
};
