const React = require('react');

module.exports = (Component) => (props) => {
  // eslint-disable-next-line react/prop-types
  const _children = React.Children.map(props.children, (c) => {
    return React.cloneElement(c, {
      ...c.props,
      // eslint-disable-next-line react/prop-types
      collapsed: props.collapsed
    });
  });

  return (
    <Component {...props}>
      {_children}
    </Component>
  );
};
