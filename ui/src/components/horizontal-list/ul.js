const Styled = require('styled-components');
const composers = require('../../shared/composers');
const fns = require('../../shared/functions');

const {
  remcalc
} = fns;

const {
  Baseline
} = composers;

const {
  default: styled
} = Styled;

const Ul = styled.ul`
  list-style-type: none;
  margin-bottom: ${remcalc(33)};
`;

module.exports = Baseline(
  Ul
);