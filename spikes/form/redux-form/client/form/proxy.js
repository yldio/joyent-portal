const transformPropsWith = require('transform-props-with');
const Input = require('./input');

const {
  default: tx
} = transformPropsWith;

const flattenProps = props => {
  const { input, meta, ...rest } = props;
  return {
    ...input,
    ...meta,
    ...rest
  };
}

module.exports = {
  Input: tx(flattenProps)(Input)
};
