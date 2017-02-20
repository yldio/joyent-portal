const Styled = require('styled-components');

const {
  css
} = Styled;

module.exports = (prop) => (...args) => (props) => props[prop]
  ? css(...args)
  : css``;
