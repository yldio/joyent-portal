/*
 * based on
 * https://github.com/roylee0704/react-flexbox-grid/blob/master/src/components/Row.js
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

const modifiers = [
  'start',
  'center',
  'end',
  'top',
  'middle',
  'bottom',
  'around',
  'between',
  'first',
  'last'
];

const getClasses = (props) => {
  return flatten(modifiers.map((name) => {
    const value = props[name];

    if (!value) {
      return;
    }

    const bps = (() => {
      if (value === true) {
        return breakpoints
      }

      if (Array.isArray(value)) {
        return value;
      }

      return [value];
    })();

    return flatten(bps.map(bp => styles[`${name}-${bp}`]));
  })).filter(Boolean);
};

const Row = module.exports = (props) => {
  const {
    className,
    reverse,
    children,
    style
  } = props;

  const cn = classNames(
    className,
    styles.row,
    reverse ? styles.reverse : '',
    ...getClasses(props)
  );

  return (
    <div style={style} className={cn}>
      {children}
    </div>
  );
};

const ModificatorType = React.PropTypes.oneOfType([
  React.PropTypes.bool,
  React.PropTypes.arrayOf(React.PropTypes.oneOf(breakpoints)),
  React.PropTypes.oneOf(breakpoints)
]);

Row.propTypes = {
  reverse: React.PropTypes.bool,
  className: React.PropTypes.string,
  style: React.PropTypes.object,
  children: React.PropTypes.node,
  ...modifiers.reduce((all, m) => ({
    ...all,
    [m]: ModificatorType
  }), {})
};
