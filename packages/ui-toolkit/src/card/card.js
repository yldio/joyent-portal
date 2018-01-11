import React from 'react';
import { Broadcast } from 'joy-react-broadcast';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import is, { isNot } from 'styled-is';
import remcalc from 'remcalc';

import Baseline from '../baseline';

const paperEffect = css`
  margin-bottom: ${remcalc(16)};
  box-shadow: 0 ${remcalc(8)} 0 ${remcalc(-5)}
      ${props => props.theme.background},
    0 ${remcalc(8)} ${remcalc(1)} ${remcalc(-4)} ${props => props.theme.grey},
    0 ${remcalc(16)} 0 ${remcalc(-10)} ${props => props.theme.background},
    0 ${remcalc(16)} ${remcalc(1)} ${remcalc(-9)} ${props => props.theme.grey};
`;

export const BaseCard = styled.div`
  box-sizing: content-box;
  display: flex;
  flex: 1 0 auto;
  flex-direction: column;

  position: relative;

  border-width: ${remcalc(1)};
  border-style: solid;

  transition: all 300ms ease;

  /* primary */
  color: ${props => props.theme.text};
  background-color: ${props => props.theme.white};
  border-color: ${props => props.theme.grey};

  ${is('shadow')`
    /* primary */
    box-shadow: ${props => props.theme.shadows.bottomShadow};

    /* if disabled, shadow is the same */
    ${isNot('disabled')`
      ${is('secondary')`
        box-shadow: ${props => props.theme.shadows.bottomShadowDarker};
      `};

      ${is('tertiary')`
        box-shadow: 0 ${remcalc(2)} 0 rgba(0, 0, 0, 0.05);
      `};

      ${is('stacked')`
        box-shadow: ${paperEffect};
      `};
    `};
  `};

  ${is('secondary')`
    color: ${props => props.theme.white};
    background-color: ${props => props.theme.primary};
    border-color: ${props => props.theme.primaryActive};
  `};

  ${is('actionable')`
    cursor: pointer;
  `};

  ${is('disabled')`
    border-color: ${props => props.theme.grey};
    background-color: ${props => props.theme.disabled};
    color: ${props => props.theme.text};
    cursor: default;
  `};

  ${is('collapsed')`
    min-height: auto;
    height: ${remcalc(46)};
    flex: 0 0 ${remcalc(46)};
  `};

  ${is('bottomless')`
    border-bottom-width: 0;
  `};
`;

/**
 * @example ./demo.md
 */
const Card = ({
  children,
  secondary,
  tertiary,
  collapsed,
  disabled,
  stacked,
  active,
  shadow,
  actionable,
  ...rest
}) => {
  const newValue = {
    secondary,
    tertiary,
    collapsed,
    disabled,
    stacked,
    active,
    shadow,
    actionable
  };

  return (
    <Broadcast channel="card" value={newValue}>
      <BaseCard {...rest} {...newValue} name="card">
        {children}
      </BaseCard>
    </Broadcast>
  );
};

Card.propTypes = {
  children: PropTypes.node,
  secondary: PropTypes.bool,
  tertiary: PropTypes.bool,
  collapsed: PropTypes.bool,
  disabled: PropTypes.bool,
  stacked: PropTypes.bool,
  active: PropTypes.bool,
  shadow: PropTypes.bool,
  actionable: PropTypes.bool
};

Card.defaultProps = {
  children: null,
  collapsed: false,
  secondary: false,
  tertiary: false,
  disabled: false,
  stacked: false,
  active: false,
  shadow: false,
  actionable: false
};

export default Baseline(Card);
