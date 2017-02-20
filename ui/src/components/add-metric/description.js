const React = require('react');
const Styled = require('styled-components');
const constants = require('../../shared/constants');
const composers = require('../../shared/composers');

const {
  colors
} = constants;

const {
  Baseline
} = composers;

const {
  default: styled
} = Styled;

const StyledDescription = styled.p`
  margin: 0;
  color: ${colors.base.text};
`;

const Description = (props) => (
  <StyledDescription name='add-metric-description'>
    {props.children}
  </StyledDescription>
);

Description.propTypes = {
  children: React.PropTypes.node
};

module.exports = Baseline(
  Description
);
