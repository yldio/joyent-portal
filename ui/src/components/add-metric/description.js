const React = require('react');
const Styled = require('styled-components');
const constants = require('../../shared/constants');

const {
  colors
} = constants;

const {
  default: styled
} = Styled;

const StyledDescription = styled.p`
  margin: 0;
  color: ${colors.base.secondary};
`;

const Description = (props) => (
  <StyledDescription name='add-metric-description'>
    {props.children}
  </StyledDescription>
);

Description.propTypes = {
  children: React.PropTypes.node
};

module.exports = Description;
