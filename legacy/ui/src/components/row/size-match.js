import sizeApply from './size-apply';

/**
 * this is the middle man between sizeApply and match. we want to turn an object
 * of {prop: value} into { prop: (props) => {} } so that each prop can only be
 * applied based on size
 *
 * ```js
 * sizeMatch('xs', {
 *   center: 'center',
 * })
 *
 * // {
 * //   center: (props) => sizeApply('xs', props['xs'], 'center')
 * // }
 * ```
 **/
export default (size, rules) => {
  return Object.keys(rules).reduce((acc, rule) => {
    return {
      ...acc,
      [rule]: (props) => sizeApply(size, props[rule], rules[rule])
    };
  }, rules);
};
