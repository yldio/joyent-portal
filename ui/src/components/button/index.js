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
} = Styled;

// TODO: this should come from constants
// and be calculated accordingly
const styles = {
  primaryBorder: '#2532BB',
  secondaryColor: '#646464',
  ...colors
};

const background = match({
  secondary: styles.background,
  disabled: styles.inactiveBackground,
}, styles.brandPrimary);

const border = match({
  secondary: styles.border,
  disabled: styles.inactiveBorder
}, styles.primaryBorder);

const color = match({
  secondary: styles.secondaryColor,
  disabled: styles.inactiveColor
}, styles.background);

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
