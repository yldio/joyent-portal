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
  
  & + & {
    margin-left: ${remcalc(24)};
  }

  & a {
    color: ${colors.base.secondaryDark};
    text-decoration: none;
    padding-bottom: ${remcalc(6)};
    
    &.active {
      cursor: default;
      color: ${colors.base.primary};
      border-bottom: 2px solid ${colors.base.primary};
    }
  }
`;
