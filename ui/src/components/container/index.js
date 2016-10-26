/*
 * based on
 * github.com/roylee0704/react-flexbox-grid/blob/master/src/components/Grid.js
 */

const React = require('react');
const classNames = require('classnames');
const styles = require('./style.css');

const Container = ({
  fluid = false,
  className,
  children,
  style
}) => {
  const cn = classNames(
    className,
    styles[fluid ? 'container-fluid' : 'container']
  );

  return (
    <div className={cn} style={style}>
      {children}
    </div>
  );
};

Container.propTypes = {
  children: React.PropTypes.node,
  className: React.PropTypes.string,
  fluid: React.PropTypes.bool,
  style: React.PropTypes.object
};

module.exports = Container;
