const fns = require('../../shared/functions');
const constants = require('../../shared/constants');
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

module.exports = styled.li`
  display: inline-block;
  margin-right: ${remcalc(24)};
  padding-top: ${remcalc(10)};
  padding-bottom: ${remcalc(10)};

  & a {
    color: ${colors.base.primary};
    text-decoration: none;
  }

  & a.active {
    cursor: default;
    color: ${colors.base.primary};
    border-bottom: 2px solid ${colors.base.primary};
    padding-bottom: ${remcalc(6)};
  }
`;
