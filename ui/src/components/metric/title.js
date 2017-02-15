const composers = require('../../shared/composers');
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
  Baseline
} = composers;

const {
  default: styled
} = Styled;

//margin: ${remcalc(18)} ${remcalc(24)} !important;
const Title = styled.h3`
  display: flex;
  align-self: flex-start;
  margin: ${remcalc(18)} auto ${remcalc(18)} ${remcalc(24)} !important;
  font-size: ${remcalc(16)};
  font-weight: normal;
  font-style: normal;
  line-height: 1.5;
  color: ${colors.base.white};
`;

module.exports = Baseline(
  Title
);