import React from 'react';
import tx from 'transform-props-with';

const Proxy = tx(({
  input,
  meta,
  ...rest
}) => ({
  ...input,
  ...meta,
  ...rest
}));

const isReduxForm = (props) =>
  props.hasOwnProperty('input') || props.hasOwnProperty('meta');

export default (Component) => {
  const ProxiedComponent = Proxy(Component);

  return (props) => {
    return isReduxForm(props) ? (
      <ProxiedComponent {...props} />
    ) : (
      <Component {...props} />
    );
  };
};
