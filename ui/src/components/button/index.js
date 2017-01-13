const constants = require('../../shared/constants');
const fns = require('../../shared/functions');
const isString = require('lodash.isstring');
const match = require('../../shared/match');
const React = require('react');
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
}, boxes.borderRadius);

// based on bootstrap 4
const style = css`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;

  margin: 0;
  padding: ${remcalc('14 16')};
  position: relative;

  font-family: -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    Roboto,
    "Helvetica Neue",
    Arial,
    sans-serif;

  font-size: ${remcalc(16)};
  font-weight: 400;
  text-align: center;
  font-style: normal;
  font-weight: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  text-decoration: none;

  white-space: nowrap;
  vertical-align: middle;
  touch-action: manipulation;
  cursor: pointer;

  color: ${color};
  background-image: none;
  background-color: ${background};
  border-radius: ${borderRadius};
  border: solid ${remcalc(1)} ${border};

  box-shadow: ${boxes.bottomShaddow};

  &:focus {
    outline: 0;
    text-decoration: none;
    background-color: ${background};
    border: solid ${remcalc(1)} ${border};
  }

  &:hover {
    background-color: ${backgroundHover};
    border: solid ${remcalc(1)} ${borderHover};
  }

  &:active,
  &:active:hover,
  &:active:focus {
    background-image: none;
    outline: 0;

    background-color: ${backgroundActive};
    border: solid ${remcalc(1)} ${borderActive};
  }

  &[disabled] {
    cursor: not-allowed;
    box-shadow: none;
    pointer-events: none;
  }
`;

const StyledButton = styled.button`
  ${style}
`;

const StyledAnchor = styled.a`
  display: inline-block !important;
  ${style}
`;


const Button = (props) => {
  // support FormattedMessage
  if (isString(props)) {
    return (
      <StyledButton>
        {props}
      </StyledButton>
    );
  }

  return props.href ? (
    <StyledAnchor {...props} />
  ) : (
    <StyledButton {...props} />
  );
};

Button.propTypes = {
  href: React.PropTypes.string
};

module.exports = Button;
