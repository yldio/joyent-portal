const constants = require('../../shared/constants');
const typography = require('../../shared/composers/typography');

const Styled = require('styled-components');

const {
  colors
} = constants;

const {
  default: styled
} = Styled;

module.exports = styled.div`
  font-size: 1rem;
  line-height: 1.5;
  background-color: ${colors.base.background};
  
  ${typography.libreFranklin}
  ${typography.bodyColor}
  ${typography.regular}
  
`;

module.exports.global = require('./global');
