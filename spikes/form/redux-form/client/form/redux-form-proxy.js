const React = require('react');
const transformPropsWith = require('transform-props-with');

const {
  default: tx
} = transformPropsWith;

const Proxy = tx(props => {
  const { input, meta, ...rest } = props;
  return {
    ...input,
    ...meta,
    ...rest
  };
});

const isReduxForm = (props) =>
  props.hasOwnProperty('input') || props.hasOwnProperty('meta');

module.exports = (Component) => {
  const ProxiedComponent = Proxy(Component);

  return (props) => {
    return isReduxForm(props) ? (
      <ProxiedComponent {...props} />
    ) : (
      <Component {...props} />
    )
  }
};
