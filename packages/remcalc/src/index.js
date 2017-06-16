const flatten = require('lodash.flatten');

const BASE = 16;

const calc = (base, ...values) =>
  flatten(values.map(value => String(value).split(/\s/gim)))
    .map(value => `${Number(value.replace('px', '')) / base}rem`)
    .join(' ');

module.exports = (...values) => calc(BASE, ...values);
module.exports.withBase = calc;
