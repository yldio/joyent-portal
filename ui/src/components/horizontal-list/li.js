const fns = require('../../shared/functions');
const Styled = require('styled-components');

const {
  remcalc
} = fns;

const {
  default: styled
} = Styled;

module.exports = styled.li`
  display: inline-block;
  margin-right: ${remcalc(10)};
  padding-top: ${remcalc(10)};
  padding-bottom: ${remcalc(10)};

  & a.active {
    cursor: default;
    color: #373A3C;
    text-decoration: none;
  }
`;
