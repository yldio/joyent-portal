import React from 'react';
import { Broadcast, Subscriber } from 'joy-react-broadcast';
import PropTypes from 'prop-types';
import is, { isNot, isOr } from 'styled-is';
import isBoolean from 'lodash.isboolean';
import remcalc from 'remcalc';

import Baseline from '../baseline';
import Card, { BaseCard } from './card';

const BaseHeader = BaseCard.extend`
  flex-direction: row;
  z-index: 1;
  line-height: ${remcalc(24)};
  height: auto;

  margin: ${remcalc(-1)} ${remcalc(-1)} 0 ${remcalc(-1)};

  ${is('parentCollapsed')`
    margin: ${remcalc(-1)};
    box-shadow: none;
  `};

  ${isOr('tertiary', 'transparent')`
    box-shadow: none;
    background-color: transparent;
    border-width: 0;
    margin: 0;
  `};

  ${isNot('secondary', 'tertiary')`
    ${is('transparent')`
      color: ${props => props.theme.text};
        -webkit-text-fill-color: ${props => props.theme.text};
    `};
  `};

  ${is('disabled')`
    color: ${props => props.theme.text};
    -webkit-text-fill-color: ${props => props.theme.text};
    border-color: ${props => props.theme.grey};
    box-shadow: none;
  `};

  button {
    margin-bottom: 0;
    margin-top: 0;
  }
`;

const BaseBox = BaseCard.extend`
  width: ${remcalc(49)};
  min-width: ${remcalc(49)};
  min-height: ${remcalc(46)};

  display: inline-flex;
  flex: 0 0 auto;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-color: transparent;
  border-width: 0;
  border-radius: 0;
  box-shadow: none;

  ${is('border')`
    border-right-width: ${props => (props.border === 'right' ? remcalc(1) : 0)};
    border-left-width: ${props => (props.border === 'left' ? remcalc(1) : 0)};
  `};

  ${is('actionable', 'secondary')`
    &:hover {
      background-color: ${props => props.theme.primaryHover};
    }
  `};

  ${is('disabled')`
    color: ${props => props.theme.text};
    -webkit-text-fill-color: ${props => props.theme.text};
    border-color: ${props => props.theme.grey};
    box-shadow: none;

    &:hover {
      background-color: transparent;
    }
  `};
`;

const BaseMeta = BaseCard.extend`
  box-sizing: border-box;
  min-height: ${remcalc(47)};
  width: auto;
  height: auto;
  padding: ${remcalc(12)};

  display: inline-flex;
  flex: 1 1 auto;
  flex-direction: column;
  justify-content: center;

  align-items: stretch;
  align-content: stretch;
  overflow: hidden;

  background-color: transparent;
  border-width: 0;
  box-shadow: none;
  color: inherit;
`;

export const Box = ({ children, border, actionable, ...rest }) => {
  const render = ({ secondary, transparent, parentCollapsed, ...value }) => {
    // if parent is collapsed, show border
    // if parent is not collapsed, only if this is secondary and not transparent
    const showBorder = parentCollapsed || (secondary && !transparent);
    const newBorder = showBorder && border;

    return (
      <BaseBox
        {...value}
        {...rest}
        name="card-header-box"
        border={newBorder}
        secondary={secondary}
        transparent={transparent}
        parentCollapsed={parentCollapsed}
        actionable={actionable}
        collapsed
      >
        {children}
      </BaseBox>
    );
  };

  return <Subscriber channel="card">{render}</Subscriber>;
};

Box.propTypes = {
  ...Card.propTypes,
  children: PropTypes.node,
  border: PropTypes.oneOf(['left', 'right'])
};

Box.defaultProps = {
  ...Card.defaultProps,
  children: null,
  border: null
};

export const Meta = ({ children, ...rest }) => (
  <Subscriber channel="card">
    {value => (
      <BaseMeta {...rest} {...value} name="card-header-meta" collapsed>
        {children}
      </BaseMeta>
    )}
  </Subscriber>
);

const Header = ({ children, transparent, shadow, ...rest }) => {
  const render = ({ secondary, tertiary, collapsed, actionable, ...value }) => {
    const parentPrimary = !secondary && !tertiary;
    // if secondary is hardcoded, use that
    // if transparent and parent is secondary, keep seconday
    // if parent is secondary, keep being secondary or
    // if parent is primary, become secondary
    const isSecondary = isBoolean(rest.secondary)
      ? rest.secondary
      : transparent ? secondary : secondary || parentPrimary;
    // if parent is primary, don't become transparent
    const isTransparent = transparent || secondary || tertiary;

    const newValue = {
      ...value,
      parentCollapsed: collapsed,
      secondary: isSecondary,
      tertiary: isBoolean(rest.tertiary) ? rest.tertiary : tertiary,
      actionable: isBoolean(rest.actionable) ? rest.actionable : actionable,
      transparent: isTransparent,
      collapsed: true,
      shadow: Boolean(shadow)
    };

    return (
      <Broadcast channel="card" value={newValue}>
        <BaseHeader
          {...rest}
          {...newValue}
          name="card-header"
          parentCollapsed={collapsed}
          shadow={shadow}
        >
          {children}
        </BaseHeader>
      </Broadcast>
    );
  };

  return <Subscriber channel="card">{render}</Subscriber>;
};

Header.propTypes = {
  children: PropTypes.node
};

Header.defaultProps = {
  children: null
};

export default Baseline(Header);
