const composers = require('../../shared/composers');
const BaseInput = require('./base-input');
const Toggle = require('./toggle');

const {
  Baseline
} = composers;

const Checkbox = Toggle({
  type: 'checkbox'
});

module.exports = Baseline(
  BaseInput(Checkbox)
);
