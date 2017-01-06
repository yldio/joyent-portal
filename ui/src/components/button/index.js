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
  default: styled
} = Styled;

const background = match({
  secondary: colors.brandSecondary,
  disabled: colors.brandInactive
}, colors.brandPrimary);

const backgroundHover = match({
  secondary: colors.brandSecondaryDark,
  disabled: colors.brandInactive
}, colors.brandPrimaryDark);

const backgroundActive = match({
  secondary: colors.brandSecondaryDarkest,
  disabled: colors.brandInactive
}, colors.brandPrimaryDarkest);

const border = match({
  secondary: colors.borderSecondary,
  disabled: colors.borderInactive
}, colors.borderPrimary);

const borderHover = match({
  secondary: colors.borderSecondaryDark,
  disabled: colors.borderInactive
}, colors.borderPrimaryDark);

const borderActive = match({
  secondary: colors.borderSecondaryDarkest,
  disabled: colors.borderInactive
}, colors.borderPrimaryDarkest);

const color = match({
  secondary: colors.brandSecondaryColor,
  disabled: colors.brandInactiveColor
}, colors.brandPrimaryColor);

const borderRadius = match({
  rect: 0
}, remcalc(boxes.borderRadius));

// based on bootstrap 4
module.exports = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  margin-bottom: 0;
  padding: ${remcalc('14 16')};

  font-size: ${remcalc(16)};
  font-weight: 400;
  text-align: center;

  white-space: nowrap;
  vertical-align: middle;
  touch-action: manipulation;
  cursor: pointer;

  color: ${color};
  background-image: none;
  background-color: ${background};
  border-radius: ${borderRadius};
  border: solid 1px ${border};

  box-shadow: ${boxes.bottomShaddow};

  &:focus {
    outline: 0;
    text-decoration: none;
    background-color: ${background};
    border: solid 1px ${border};
  }

  &:hover {
    background-color: ${backgroundHover};
    border: solid 1px ${borderHover};
  }

  &:active,
  &:active:hover,
  &:active:focus {
    background-image: none;
    outline: 0;

    background-color: ${backgroundActive};
    border: solid 1px ${borderActive};
  }

  &[disabled] {
    cursor: not-allowed;
    box-shadow: none;
    pointer-events: none;
  }
`;
