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

const Column = (props) => {
  const {
    children,
    className,
    reverse,
    style
  } = props;

  const cn = classNames(
    className,
    styles.column,
    reverse ? styles.reverse : '',
    ...getClasses(props)
  );

  return (
    <div className={cn} style={style}>
      {children}
    </div>
  );
};

Column.propTypes = {
  children: React.PropTypes.node,
  className: React.PropTypes.string,
  reverse: React.PropTypes.bool,
  style: React.PropTypes.object,
  ...breakpoints.reduce((all, bp) => ({
    ...all,
    [`${bp}Offset`]: React.PropTypes.number,
    [bp]: React.PropTypes.number
  }), {})
};

module.exports = Column;
