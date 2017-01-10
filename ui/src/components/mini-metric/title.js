const constants = require('../../shared/constants');
const fns = require('../../shared/functions');
const Styled = require('styled-components');

const {
  colors
} = constants;

const {
  remcalc
} = fns;

const {
  default: styled
} = Styled;

module.exports = styled.h3`
  margin: 0;
  text-align: right;
  font-size: ${remcalc(14)};
  font-weight: 600;
  font-style: normal;
  line-height: 1.29;
  color: ${colors.semibold};
  margin-bottom: ${remcalc(3)} !important;
`;
