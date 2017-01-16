const fns = require('../../shared/functions');
const Styled = require('styled-components');

const {
  remcalc
} = fns;

const {
  default: styled
} = Styled;

module.exports = styled.h1`
  font-size: ${remcalc(36)};
  font-weight: 600;
  font-style: normal;
  font-stretch: normal;
  color: #364acd;
  border-bottom: ${remcalc(1)} solid #d8d8d8;

  & a {
    text-decoration: none;
  }
`;
