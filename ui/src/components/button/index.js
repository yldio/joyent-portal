const constants = require('../../shared/constants');
const fns = require('../../shared/functions');
const match = require('../../shared/match');
const Styled = require('styled-components');

const {
  colors,
  boxes
} = constants;

const {
  remcalc
} = fns;

const {
  default: styled,
  css
} = Styled;

// TODO: this should come from constants
// and be calculated accordingly
const colors = {
  primaryBackground: colors.brandPrimary;
  primaryBorder: '#2532BB';
  primaryColor: '#FFFFFF';
  secondaryBackgroud: '#FFFFFF';
  secondaryBorder: '#D8D8D8';
  secondaryColor: '#646464';
  inactiveBackground: '#F9F9F9';
  inactiveBorder: '#D8D8D8';
  inactiveColor: '#737373';
};

const background = match({
  secondary: colors.secondaryBackgroud,
  inactive: colors.inactiveBackground
}, colors.primaryBackground);

const border = match({
  secondary: colors.secondaryBorder,
  inactive: colors.inactiveBorder
}, colors.primaryBorder);

const color = match({
  secondary: colors.secondaryColor,
  inactive: colors.inactiveColor
}, colors.primaryColor);

module.exports = styled.button`
  border-radius: ${remcalc(boxes.borderRadius)};
  box-shadow: ${boxes.bottomShaddow};
  font-size: ${remcalc(16)};
  min-width: ${remcalc(120)};
  padding: ${remcalc(18 24)};

  background: ${background};
  border: 1px solid ${border};
  color: ${color};
`;
