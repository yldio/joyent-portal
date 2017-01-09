const Column = require('../column');
const React = require('react');

const Outlet = (props) => {
  if (props.collapsed) {
    return null;
  }

  return (
    <Column
      name='list-item-outlet'
      xs={6}
      {...props}
    >
      {props.children}
    </Column>
  );
};

Outlet.propTypes = {
  children: React.PropTypes.node,
  collapsed: React.PropTypes.bool
};

module.exports = Outlet;
