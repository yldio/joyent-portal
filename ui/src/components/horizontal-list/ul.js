const Styled = require('styled-components');
const fns = require('../../shared/functions');

const {
  remcalc
} = fns;

const {
  default: styled
} = Styled;

module.exports = styled.ul`
  list-style-type: none;
  margin-bottom: ${remcalc(33)};
`;
