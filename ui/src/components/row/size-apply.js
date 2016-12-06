const isArray = require('lodash.isarray');
const isString = require('lodash.isstring');

/**
 * given a size, a prop and a value, we want to get that value
 * if the rule matches the size
 *
 * ```js
 * sizeApply('xs', 'xs', 'row-reverse'); //=> 'row-reverse'
 * sizeApply('xs', true, 'row-reverse'); //=> 'row-reverse'
 * sizeApply('xs', ['xs', 'sm'], 'row-reverse'); //=> 'row-reverse'
 * sizeApply('xs', 'sm', 'row-reverse'); //=> false
 * sizeApply('xs', false, 'row-reverse'); //=> false
 * sizeApply('xs', ['sm', 'lg'], 'row-reverse'); //=> false
 * ```
 **/
module.exports = (size, prop, value) => {
  if (isString(prop) && prop === size) {
    return value;
  }

  if (isArray(prop) && (prop.indexOf(size) >= 0)) {
    return value;
  }

  return prop ? value : false;
};