const composers = require('../../shared/composers');
const constants = require('../../shared/constants');
const fns = require('../../shared/functions');
const isString = require('lodash.isstring');
const match = require('../../shared/match');
const React = require('react');
const Styled = require('styled-components');
const ReactRouter = require('react-router-dom');

const {
  base,
  inactive,
} = constants.colors;

const {
  boxes
} = constants;

const {
  Baseline
} = composers;

const {
  remcalc
} = fns;

const {
  default: styled,
  css
} = Styled;

const {
  Link
} = ReactRouter;

const background = match({
  secondary: base.white,
  disabled: inactive.default
}, base.primary);

const backgroundHover = match({
  secondary: base.grey,
  disabled: inactive.default
}, base.primaryLight);

const backgroundActive = match({
  secondary: base.greyDarker,
  disabled: inactive.default
}, base.primaryDark);

const border = match({
  secondary: base.greyLight,
  disabled: inactive.greyLight
}, base.primary);

const borderHover = match({
  secondary: base.grey,
  disabled: inactive.default
}, base.primaryDark);

const borderActive = match({
  secondary: base.greyDarker,
  disabled: inactive.default
}, base.primaryDark);

const color = match({
  secondary: base.secondary,
  disabled: inactive.text
}, base.white);

const borderRadius = match({
  rect: 0
}, boxes.borderRadius);

// based on bootstrap 4
const style = css`
  box-sizing: border-box;
  display: inline-block;
  justify-content: center;
  align-items: center;

  margin: 0;
  padding: ${remcalc('14 16')};
  position: relative;

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
  min-width: ${remcalc(120)};
  ${style}

  // Need to use HTML element selector, as adjecent buttons may have
  // different class names if they are primary/secondary/disabled
  & + button {
    margin-left: 20px;
  }
`;

const StyledAnchor = styled.a`
  display: inline-block !important;
  ${style}
`;

const StyledLink = styled(Link)`
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

  const {
    href = '',
    rr = false
  } = props;

  const Views = [
    () => !href ? StyledButton : null,
    () => !rr ? StyledAnchor : null,
    () => StyledLink
  ];

  const View = Views.reduce((sel, view) => sel ? sel : view(), null);

  return (
    <View {...props} />
  );
};

Button.propTypes = {
  href: React.PropTypes.string,
  rr: React.PropTypes.bool
};

module.exports = Baseline(
  Button
);
