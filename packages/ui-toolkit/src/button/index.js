import React from 'react';
import remcalc from 'remcalc';
import PropTypes from 'prop-types';
import is, { isOr } from 'styled-is';
import styled from 'styled-components';
import { Button as NButton } from 'normalized-styled-components';

import BaseAnchor from '../anchor';
import Baseline from '../baseline';
import StatusLoader from '../status-loader';

const StyledButton = NButton.extend`
  min-width: ${remcalc(120)};

  & + button {
    margin-left: ${remcalc(6)};
  }
`;

const InlineAnchor = styled(({ component, children, ...rest }) =>
  React.createElement(component, rest, children)
)`
  display: inline-block;
`;

/**
 * @example ./usage.md
 */
const BaseButton = props => {
  const { href = '', component, loading = false, secondary } = props;

  const Views = [
    () => {
      return (
        component &&
        (({ children, ...props }) =>
          React.createElement(InlineAnchor, props, children))
      );
    },
    () => {
      return (
        href &&
        (({ children, ...props }) =>
          React.createElement(
            InlineAnchor,
            { ...props, component: BaseAnchor },
            children
          ))
      );
    },
    () => ({ children, ...props }) => {
      return React.createElement(
        InlineAnchor,
        { ...props, component: StyledButton },
        children
      );
    }
  ];

  const View = Views.reduce((sel, view) => (sel ? sel : view()), null);

  const children = loading ? (
    <StatusLoader secondary={!secondary} small />
  ) : (
    props.children
  );

  return (
    <View {...props} href={href}>
      {children}
    </View>
  );
};

/**
 * Buttons are the core of any UI kit, and we are no exception. Here we have documented to most basic variations of the button states, which include but are limited to; Default, Hover, Clicked, and Disabled.
 */
const Button = styled(BaseButton)`
  box-sizing: border-box;
  display: inline-block;
  justify-content: center;
  align-items: center;

  min-height: ${remcalc(48)};
  height: ${remcalc(48)};
  min-width: ${remcalc(120)};
  margin-bottom: ${remcalc(8)};
  margin-top: ${remcalc(8)};
  padding: ${remcalc(15)} ${remcalc(18)};
  position: relative;

  font-size: ${remcalc(15)};
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

  color: ${props => props.theme.white};
  -webkit-text-fill-color: currentcolor;
  background-image: none;
  background-color: ${props => props.theme.primary};
  border-radius: ${props => props.theme.borderRadius};
  border: solid ${remcalc(1)} ${props => props.theme.primaryActive};

  &:focus {
    outline: 0;
    text-decoration: none;
    background-color: ${props => props.theme.primary};
    border-color: ${props => props.theme.primaryActive};
  }

  &:hover {
    background-color: ${props => props.theme.primaryHover};
    border: solid ${remcalc(1)} ${props => props.theme.primaryActive};
  }

  &:active,
  &:active:hover,
  &:active:focus {
    background-image: none;
    outline: 0;
    background-color: ${props => props.theme.primaryActive};
    border-color: ${props => props.theme.primaryActive};
  }

  &[disabled] {
    cursor: not-allowed;
    pointer-events: none;
  }

  ${is('secondary')`
    color: ${props => props.theme.secondary};
    -webkit-text-fill-color: currentcolor;
    background-color: ${props => props.theme.white};
    border-color: ${props => props.theme.grey};

    &:focus {
      background-color: ${props => props.theme.white};
      border-color: ${props => props.theme.grey};
    }

    &:hover {
      background-color: ${props => props.theme.whiteHover};
      border-color: ${props => props.theme.grey};
    }

    &:active,
    &:active:hover,
    &:active:focus {
      background-color: ${props => props.theme.whiteActive};
      border-color: ${props => props.theme.grey};
    }
  `};

  ${is('error')`
    color: ${props => props.theme.red};
    -webkit-text-fill-color: currentcolor;
    background-color: ${props => props.theme.white};
    border-color: ${props => props.theme.red};
    font-weight: 600;

    &:focus {
      background-color: ${props => props.theme.white};
      border-color: ${props => props.theme.red};
    }

    &:hover {
      background-color: ${props => props.theme.whiteHover};
      border-color: ${props => props.theme.red};
    }

    &:active,
    &:active:hover,
    &:active:focus {
      background-color: ${props => props.theme.whiteActive};
      border-color: ${props => props.theme.red};
    }
  `};

  ${isOr('disabled', 'loading')`
    cursor: not-allowed;
    pointer-events: none;
    color: ${props => props.theme.grey};
    background-color: ${props => props.theme.disabled};
    border-color: ${props => props.theme.grey};

    &:focus {
      background-color: ${props => props.theme.disabled};
      border-color: ${props => props.theme.grey};
    }

    &:hover {
      background-color: ${props => props.theme.disabled};
      border-color: ${props => props.theme.disabled};
    }

    &:active,
    &:active:hover,
    &:active:focus {
      background-color: ${props => props.theme.disabled};
      border-color: ${props => props.theme.disabled};
    }
  `};

  ${is('rect')`
    border-radius: 0;
  `};

  ${is('small')`
    padding: ${remcalc(9)} ${remcalc(18)};
    font-size: ${remcalc(13)};
    min-width: ${remcalc(0)};
  `};

  ${is('icon')`
    display: inline-flex;
    align-items: center;
    min-width: ${remcalc(0)};


    & svg + span {
      margin-left: ${remcalc(12)};
    }

    & svg {
      max-height: ${remcalc(18)};
    }
  `};

  ${is('fluid')`
    width: 100%;
    max-width: 100%;
  `};

  ${is('marginless')`
    margin: 0;
  `};

  ${is('bold')`
    font-weight: 500;
  `};

  ${is('right')`
    float: right;
  `};
`;

Button.propTypes = {
  /**
   * The `<button>`/`<a>`/`<Link>` text
   */
  children: PropTypes.node,
  /**
   * When used, it will render an `<a>` with the given href
   */
  href: PropTypes.string,
  /**
   * When used, it will render a `<Link>` with the given to
   */
  to: PropTypes.string,
  /**
   * Is it primary ?
   */
  primary: PropTypes.bool,
  /**
   * Is it secondary ?
   */
  secondary: PropTypes.bool,
  /**
   * When set to true a smaller version of the button will show
   */
  small: PropTypes.bool,
  /**
   * Set to true to show loading animation
   */
  loading: PropTypes.bool
};

Button.defaultProps = {
  primary: true,
  secondary: false,
  small: false,
  loading: false
};

export default Baseline(Button);
