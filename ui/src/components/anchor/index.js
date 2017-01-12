const constants = require('../../shared/constants');
const React = require('react');
const Styled = require('styled-components');

const {
  colors
} = constants;

const {
  default: styled
} = Styled;

const color = (props) => props.secondary
  ? colors.brandSecondaryLink
  : colors.brandPrimaryLink;

const Anchor = styled.a`
  color: ${color} !important;
`;

module.exports = Anchor;

module.exports.fn = (element) => (props) => React.cloneElement(element, {
  ...element.props,
  ...props
}, element.props.children);
