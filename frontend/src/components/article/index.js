const Styled = require('styled-components');
const constants = require('@ui/shared/constants');

const {
  colors,
  sizes
} = constants;

const {
  default: styled
} = Styled;

// Main Contonent Wrapper Styles
module.exports = styled.article`
  background-color: ${colors.base.grey};
  
  ${sizes.sm}
`;
