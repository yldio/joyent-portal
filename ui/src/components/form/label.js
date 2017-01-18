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

module.exports = styled.label`
  width: 100%;
  font-size: ${remcalc(16)};
  font-weight: 600;
  font-style: normal;
  font-stretch: normal;
  color: ${colors.brandSecondaryColor};
`;
