const flatten = require('lodash.flatten');
const remcalc = require('remcalc');

const BASE = 6;

const calc = (base, ...values) =>
  flatten(values.map(value => String(value).split(/\s/gim)))
    .map(value => remcalc(Number(value) * base))
    .join(' ');

module.exports = (...values) => calc(BASE, ...values);
module.exports.withBase = calc;
