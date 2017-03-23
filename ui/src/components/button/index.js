import { colors, boxes } from '../../shared/constants';
import { Baseline, typography, paperEffect } from '../../shared/composers';
import { remcalc } from '../../shared/functions';
import isString from 'lodash.isstring';
import match from '../../shared/match';
import React from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

const {
  base,
  inactive
} = colors;

const background = match({
  secondary: base.white,
  disabled: inactive.default,
  tertiary: 'transparent'
}, base.primary);

const backgroundHover = match({
  secondary: base.whiteHover,
  disabled: inactive.default,
  tertiary: 'transparent'
}, base.primaryHover);

const backgroundActive = match({
  secondary: base.whiteActive,
  disabled: inactive.default,
  tertiary: 'transparent'
}, base.primaryHover);

const border = match({
  secondary: base.grey,
  disabled: inactive.grey,
  tertiary: inactive.text
}, base.primaryDesaturated);

const borderHover = match({
  secondary: base.grey,
  disabled: inactive.default,
  tertiary: inactive.text
}, base.primaryDark);

const borderActive = match({
  secondary: base.grey,
  disabled: inactive.default,
  tertiary: inactive.text
}, base.primaryDesaturatedHover);

const color = match({
  secondary: base.secondary,
  disabled: inactive.text,
  tertiary: inactive.grey
}, base.white);

const boxShadow = match({
  secondary: 'box-shadow: ${boxes.bottomShaddow};',
  disabled: 'box-shadow: ${boxes.bottomShaddow};',
  tertiary: paperEffect
}, '');

const borderRadius = match({
  rect: 0,
  tertiary: 0
}, boxes.borderRadius);

// based on bootstrap 4
const style = css`
  box-sizing: border-box;
  display: inline-block;
  justify-content: center;
  align-items: center;

  margin: 0;
  padding: ${remcalc(14)} ${remcalc(16)};
  position: relative;

  ${typography.libreFranklin};
  ${typography.normal};

  font-size: ${remcalc(16)};
  text-align: center;
  font-style: normal;
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

  ${boxShadow};

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
    margin-left: ${remcalc(20)};
  }
`;

const StyledAnchor = styled(Link)`
  display: inline-block;
  ${style}
`;

const StyledLink = styled(Link)`
  display: inline-block;
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
    to = '',
    rr = false
  } = props;

  const Views = [
    () => !to && !href ? StyledButton : null,
    () => !rr ? StyledAnchor : null,
    () => StyledLink
  ];

  const View = Views.reduce((sel, view) => sel ? sel : view(), null);

  return (
    <View {...props}>
      {props.children}
    </View>
  );
};

Button.propTypes = {
  children: React.PropTypes.node,
  href: React.PropTypes.string,
  rr: React.PropTypes.bool,
  to: React.PropTypes.string
};

export default Baseline(
  Button
);

export { default as ButtonIcon } from './icon';
