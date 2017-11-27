import React from 'react';
import remcalc from 'remcalc';
import PropTypes from 'prop-types';
import is, { isOr } from 'styled-is';
import styled, { css } from 'styled-components';
import { A, Button as NButton } from 'normalized-styled-components';
import { Link } from 'react-router-dom';
import { borderRadius } from '../boxes';
import typography from '../typography';
import Baseline from '../baseline';
import StatusLoader from '../status-loader';

// Based on bootstrap 4
const style = css`
  box-sizing: border-box;
  display: inline-block;
  justify-content: center;
  align-items: center;

  margin-bottom: ${remcalc(8)};
  margin-top: ${remcalc(8)};
  padding: ${remcalc(13)} ${remcalc(18)};
  position: relative;

  ${typography.normal};
  ${typography.loadedFontFamily};
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
  background-image: none;
  background-color: ${props => props.theme.primary};
  border-radius: ${borderRadius};
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

  ${is('tertiary')`
    color: ${props => props.theme.text};
    background-color: ${props => props.theme.disabled};
    border-color: ${props => props.theme.grey};
    font-weight: 600;

    &:focus,
    &:hover,
    &:active,
    &:active:hover,
    &:active:focus {
      color: ${props => props.theme.text};
      background-color: ${props => props.theme.disabled};
      border-color: ${props => props.theme.grey};
    }
  `};

  ${is('error')`
    color: ${props => props.theme.red};
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

  ${is('tertiary', 'selected')`
      background-color: rgba(59, 70, 204, 0.2);
      color: ${props => props.theme.primaryActive};
      border-color: ${props => props.theme.primaryActive};

    &:focus,
    &:hover,
    &:active,
    &:active:hover,
    &:active:focus {
      background-color: rgba(59, 70, 204, 0.2);
      color: ${props => props.theme.primaryActive};
      border-color: ${props => props.theme.primaryActive};
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
    padding: ${remcalc(14)} ${remcalc(14)};
  `};

  ${is('icon')`
    min-height: ${remcalc(48)};
    display: flex;
    align-items: center;
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
`;

const StyledButton = NButton.extend`
  min-width: ${remcalc(120)};

  ${style} & + button {
    margin-left: ${remcalc(6)};
  }
`;

const StyledAnchor = A.extend`
  display: inline-block;
  ${style};
`;

const StyledLink = styled(Link)`
  display: inline-block;
  ${style};
`;

/**
 * @example ./usage.md
 */
const Button = props => {
  const { href = '', to = '', loading = false, secondary } = props;

  const Views = [
    () => (to ? StyledLink : null),
    () => (href ? StyledAnchor : null),
    () => StyledButton
  ];

  const View = Views.reduce((sel, view) => (sel ? sel : view()), null);

  const children = loading ? (
    <StatusLoader secondary={!secondary} small />
  ) : (
    props.children
  );

  return <View {...props}>{children}</View>;
};

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
   * Is it tertiary ?
   */
  tertiary: PropTypes.bool,
  /**
   * When set to true a smaller version of the button will show
   */
  small: PropTypes.bool,
  /**
   * Set to true to show loading animation
   */
  loading: PropTypes.bool,
  /**
   * When used, will give button an active state (Only for tertiary for now)
   */
  selected: PropTypes.bool
};

Button.defaultProps = {
  primary: true,
  secondary: false,
  tertiary: false,
  small: false,
  loading: false,
  selected: false
};

export default Baseline(Button);
