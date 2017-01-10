const constants = require('../../shared/constants');
const Styled = require('styled-components');

const {
  colors
} = constants;

const {
  default: styled
} = Styled;

module.exports = styled.h3`
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.29;
  color: ${colors.semibold};
`;
