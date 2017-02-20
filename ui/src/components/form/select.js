const composers = require('../../shared/composers');
const BaseInput = require('./base-input');

const {
  Baseline
} = composers;

const {
  Stylable
} = BaseInput;

module.exports = Baseline(
  BaseInput(Stylable('select'))
);
