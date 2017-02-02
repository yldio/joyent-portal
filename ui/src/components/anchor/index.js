const constants = require('../../shared/constants');
const React = require('react');
const Styled = require('styled-components');

const {
  base,
} = constants.colors;

const {
  default: styled
} = Styled;

const color = (props) => props.secondary
  ? base.secondary
  : base.primary;

const Anchor = styled.a`
  color: ${color} !important;
`;

module.exports = Anchor;

module.exports.fn = (element) => (props) => React.cloneElement(element, {
  ...element.props,
  ...props
}, element.props.children);
