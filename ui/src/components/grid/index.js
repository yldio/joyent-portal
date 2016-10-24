// based on https://github.com/roylee0704/react-flexbox-grid/blob/master/src/components/Grid.js

const React = require('react');
const style = require('./style.css');

const Grid = module.exports = ({
  fluid = false,
  children
}) => {
  const className = style[fluid ? 'container-fluid' : 'container'];

  return (
    <div className={className}>
      {children}
    </div>
  );
};

Grid.propTypes = {
  fluid: React.PropTypes.bool,
  children: React.PropTypes.node
}
