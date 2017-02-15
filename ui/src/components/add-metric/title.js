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

const StyledTitle = styled.h4`
  margin: 0;
  color: ${colors.fonts.semibold};
`;

const Title = ({
  children
}) => (
  <StyledTitle name='add-metric-title'>
    {children}
  </StyledTitle>
);

Title.propTypes = {
  children: React.PropTypes.node
};

module.exports = Baseline(
  Title
);
