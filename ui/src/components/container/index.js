/*
 * based on
 * https://github.com/roylee0704/react-flexbox-grid/blob/master/src/components/Grid.js
 */

const React = require('react');
const classNames = require('classnames');
const styles = require('./style.css');

const Container = module.exports = ({
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
    <div style={style} className={cn}>
      {children}
    </div>
  );
};

Container.propTypes = {
  fluid: React.PropTypes.bool,
  className: React.PropTypes.string,
  style: React.PropTypes.object,
  children: React.PropTypes.node
};
