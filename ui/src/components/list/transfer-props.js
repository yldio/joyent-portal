const isString = require('lodash.isstring');
const React = require('react');

const transfer = (parentProps, props) => {
// eslint-disable-next-line react/prop-types
  return React.Children.map(props.children, (c) => {
    return React.cloneElement(c, {
      ...c.props,
      ...parentProps.reduce((sum, name) => ({
        ...sum,
        [name]: props[name]
      }), {})
    });
  });
};

module.exports = (parentProps, Component) => (props) => {
// eslint-disable-next-line react/prop-types
  const _children = !isString(props.children)
    ? transfer(parentProps, props)
// eslint-disable-next-line react/prop-types
    : props.children;

  return (
    <Component {...props}>
      {_children}
    </Component>
  );
};
