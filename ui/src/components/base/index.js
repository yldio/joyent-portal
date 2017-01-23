const constants = require('../../shared/constants');

const Styled = require('styled-components');

const {
  colors
} = constants;

const {
  default: styled,
} = Styled;

module.exports = styled.div`
  font-family: 'LibreFranklin', sans-serif;
  font-size: 1rem;
  line-height: 1.5;
  color: ${colors.fonts.regular};
  background-color: #FFFFFF;
`;

module.exports.global = require('./global');
