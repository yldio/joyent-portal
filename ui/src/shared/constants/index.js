const traverse = require('traverse');
const isFunction = require('lodash.isfunction');

const colors = require('./colors');
const boxes = require('./boxes');
const typography = require('./typography');
const sizes = require('./sizes');
const breakpoints = require('./breakpoints');

const tables = {
  bg: 'transparent',
  cellPadding: '.75rem'
};

const forms = {
  cursorDisabled: 'not-allowed'
};

const constants = traverse({
  colors,
  boxes,
  forms,
  sizes,
  tables,
  typography
}).map(function(x) {
  return isFunction(x) ? x(this.parent.node) : x;
});

module.exports = {
  ...constants,
  breakpoints
};
