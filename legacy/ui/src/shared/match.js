import find from 'lodash.find';
import isFunction from 'lodash.isfunction';

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
export default (obj = {}, initial = '') => (props) => {
  const key = find(Object.keys(obj), (key) => props[key]);

  if (!key) {
    return initial;
  }

  const op = obj[key];
  return isFunction(op) ? op(props) : op;
};

/**
 * get values based on the props[prop]
 *
 * ```js
 * const matchable = match.map({
 *   large: 20,
 *   small: 10,
 *   medium: (prop) => prop > 5 ? 15 : false
 * }, 'initial');
 *
 * matchable('type')({
 *   type: 'large'
 * }); //=> 20
 *
 * matchable('type')(); //=> 'initial'
 *
 * matchable('type'){
 *   type: 6
 * }); //=> 15
 * ```
 **/
export const prop = (obj = {}, initial = '') => (prop) => (props = {}) => {
  const value = props[prop];

  if (!value) {
    return initial;
  }

  const op = obj[value];
  return isFunction(op) ? op(value) : op;
};
