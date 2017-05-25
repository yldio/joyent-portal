import React from 'react';
import remcalc from 'remcalc';
import PropTypes from 'prop-types';
import is, { isOr } from 'styled-is';
import styled, { css } from 'styled-components';
import { A, Button as NButton } from 'normalized-styled-components';
import { Link } from 'react-router-dom';
import { bottomShaddow, borderRadius } from '../boxes';
import paperEffect from '../paper-effect';
import typography from '../typography';
import Baseline from '../baseline';

// Based on bootstrap 4
const style = css`
  box-sizing: border-box;
  display: inline-block;
  justify-content: center;
  align-items: center;

  margin: 0;
  padding: ${remcalc(15)} ${remcalc(18)};
  position: relative;

  ${typography.fontFamily};
  ${typography.normal};

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
  border: solid ${remcalc(1)} ${props => props.theme.primaryDesaturated};
  box-shadow: ${bottomShaddow};

  &:focus {
    outline: 0;
    text-decoration: none;
    background-color: ${props => props.theme.primary};
    border-color: ${props => props.theme.primaryDesaturated};
  }

  &:hover {
    background-color: ${props => props.theme.primaryHover};
    border: solid ${remcalc(1)} ${props => props.theme.primaryDark};
  }

  &:active,
  &:active:hover,
  &:active:focus {
    background-image: none;
    outline: 0;
    background-color: ${props => props.theme.primaryActive};
    border-color: ${props => props.theme.primaryDesaturatedActive};
  }

  &[disabled] {
    cursor: not-allowed;
    box-shadow: none;
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
  `}

  ${is('tertiary')`
    color: ${props => props.theme.secondary};
    background-color: ${props => props.theme.white};
    border-color: ${props => props.theme.grey};
    box-shadow: ${paperEffect};

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
      box-shadow: ${bottomShaddow};
    }
  `}

  ${is('disabled')`
    color: ${props => props.theme.grey};
    background-color: ${props => props.theme.disabled};
    border-color: ${props => props.theme.grey};
    box-shadow: ${bottomShaddow};

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
  `}

  ${isOr('rect', 'tertiary')`
    border-radius: 0;
  `}
`;

const StyledButton = NButton.extend`
  min-width: ${remcalc(120)};
  ${style}

  & + button {
    margin-left: ${remcalc(20)};
  }
`;

const StyledAnchor = A.extend`
  display: inline-block;
  ${style}
`;

const StyledLink = styled(Link)`
  display: inline-block;
  ${style}
`;

/**
 * @example ./usage.md
 */
const Button = props => {
  const { href = '', to = '' } = props;

  const Views = [
    () => (to ? StyledLink : null),
    () => (href ? StyledAnchor : null),
    () => StyledButton
  ];

  const View = Views.reduce((sel, view) => (sel ? sel : view()), null);

  return (
    <View {...props}>
      {props.children}
    </View>
  );
};

Button.propTypes = {
  /**
   * The `<button>`/`<a>`/`<Link>` text
   */
  children: PropTypes.node,
  /**
   * When used, it will render an `<a>` with the givern href
   */
  href: PropTypes.string,
  /**
   * When used, it will render a `<Link>` with the givern to
   */
  to: PropTypes.string,
  primary: PropTypes.bool,
  secondary: PropTypes.bool,
  tertiary: PropTypes.bool
};

Button.defaultProps = {
  primary: true
};

export default Baseline(Button);
