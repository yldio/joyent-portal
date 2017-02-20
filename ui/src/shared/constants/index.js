import traverse from 'traverse';
import isFunction from 'lodash.isfunction';
import * as colors from './colors';
import * as boxes from './boxes';
import * as typography from './typography';
import * as sizes from './sizes';
import * as breakpoints from './breakpoints';

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

const expBoxes = constants.boxes;
const expColors = constants.colors;
const expForms = constants.forms;
const expSizes = constants.sizes;
const expTables = constants.tables;
const expTypography = constants.typography;

export {
  breakpoints,
  expBoxes as boxes,
  expColors as colors,
  expForms as forms,
  expSizes as sizes,
  expTables as tables,
  expTypography as typography
};
