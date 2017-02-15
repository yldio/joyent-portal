const composers = require('../../shared/composers');
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
  Baseline
} = composers;

const {
  default: styled
} = Styled;

const Subtitle = styled.p`
  margin: 0;
  text-align: right;
  font-size: ${remcalc(12)};
  line-height: ${remcalc(18)};
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  color: ${colors.regular};
`;

module.exports = Baseline(
  Subtitle
);
