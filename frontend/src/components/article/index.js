const Styled = require('styled-components');
const constants = require('@ui/shared/constants');

const {
  // colors,
  breakpoints
} = constants;

const {
  default: styled
} = Styled;

// Main Contonent Wrapper Styles
module.exports = styled.article`
  padding: 2rem;

  ${breakpoints.large`
    padding: 0;
  `}
`;
