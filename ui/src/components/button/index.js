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
const styles = {
  primaryBackground: colors.brandPrimary,
  primaryBorder: '#2532BB',
  primaryColor: '#FFFFFF',
  secondaryBackgroud: '#FFFFFF',
  secondaryBorder: '#D8D8D8',
  secondaryColor: '#646464',
  inactiveBackground: '#F9F9F9',
  inactiveBorder: '#D8D8D8',
  inactiveColor: '#737373',
  ...colors
};

const background = match({
  secondary: styles.secondaryBackgroud,
  inactive: styles.inactiveBackground
}, styles.primaryBackground);

const border = match({
  secondary: styles.secondaryBorder,
  inactive: styles.inactiveBorder
}, styles.primaryBorder);

const color = match({
  secondary: styles.secondaryColor,
  inactive: styles.inactiveColor
}, styles.primaryColor);

module.exports = styled.button`
  border-radius: ${remcalc(boxes.borderRadius)};
  box-shadow: ${boxes.bottomShaddow};
  font-size: ${remcalc(16)};
  min-width: ${remcalc(120)};
  padding: ${remcalc('18 24')};

  background: ${background};
  border: solid 1px ${border};
  color: ${color};
`;
