const React = require('react');
const constants = require('../../shared/constants');
const composers = require('../../shared/composers');
const Styled = require('styled-components');

const {
  colors
} = constants;

const {
  Baseline
} = composers;

const {
  default: styled
} = Styled;

const color = (props) => props.secondary
  ? colors.base.secondary
  : colors.base.primary;

const StyledAnchor = styled.a`
  color: ${color} !important;
`;

const Anchor = Baseline(
  StyledAnchor
);

module.exports = Anchor;

module.exports.fn = (element) => (props) => React.cloneElement(element, {
  ...element.props,
  ...props
}, element.props.children);
