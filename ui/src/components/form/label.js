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

const Label = styled.label`
  width: 100%;
  font-size: ${remcalc(16)};
  font-weight: 600;
  font-style: normal;
  font-stretch: normal;
  color: ${colors.base.secondary};
`;

module.exports = Baseline(
  Label
);
