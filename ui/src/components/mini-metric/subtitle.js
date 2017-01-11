const constants = require('../../shared/constants');
const fns = require('../../shared/functions');
const Styled = require('styled-components');

const {
  remcalc
} = fns;

const {
  colors
} = constants;

const {
  default: styled
} = Styled;

module.exports = styled.p`
  margin: 0;
  text-align: right;
  font-size: ${remcalc(12)};
  line-height: ${remcalc(18)};
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  color: ${colors.regular};
`;
