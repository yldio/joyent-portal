/*
 * based on
 * https://github.com/roylee0704/react-flexbox-grid/blob/master/src/components/Col.js
 */

const flatten = require('lodash.flatten');
const classNames = require('classnames');
const React = require('react');
const styles = require('./style.css');

const breakpoints = [
  'xs',
  'sm',
  'md',
  'lg'
];

const getClasses = (props) => {
  return flatten(breakpoints.map((size) => {
    const number = props[size];
    const offset = props[`${size}Offset`];

    return [
      number ? styles[`${size}-${number}`] : '',
      offset ? styles[`${size}-offset-${offset}`] : ''
    ];
  })).filter(Boolean);
};

const Column = module.exports = (props) => {
  const {
    className,
    reverse,
    children,
    style
  } = props;

  const cn = classNames(
    className,
    styles.column,
    reverse ? styles.reverse : '',
    ...getClasses(props)
  );

  return (
    <div style={style} className={cn}>
      {children}
    </div>
  );
};

Column.propTypes = {
  reverse: React.PropTypes.bool,
  className: React.PropTypes.string,
  style: React.PropTypes.object,
  children: React.PropTypes.node,
  ...breakpoints.reduce((all, bp) => ({
    ...all,
    [`${bp}Offset`]: React.PropTypes.number,
    [bp]: React.PropTypes.number
  }), {})
};
