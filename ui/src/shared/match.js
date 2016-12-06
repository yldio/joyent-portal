const find = require('lodash.find');
const isFunction = require('lodash.isfunction');

/**
 * get values based on the props
 *
 * ```js
 * const matchable = match({
 *   large: 20,
 *   small: 10,
 *   medium: (props) => props.isBlue ? 15 : false
 * }, 'initial');
 *
 * matchable({
 *   large: true,
 *   medium: true,
 *   isBlue: true
 * }); //=> 20
 *
 * matchable({
 *   isBlue: true
 * }); //=> 'initial'
 *
 * matchable({
 *   isBlue: true,
 *   medium: true
 * }); //=> 15
 * ```
 **/
module.exports = (obj = {}, initial = '') => (props) => {
  const key = find(Object.keys(obj), (key) => props[key]);

  if (!key) {
    return initial;
  }

  const op = obj[key];
  return isFunction(op) ? op(props) : op;
};