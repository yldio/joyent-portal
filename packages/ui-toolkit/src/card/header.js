import React from 'react';
import { Broadcast, Subscriber } from 'joy-react-broadcast';
import PropTypes from 'prop-types';
import is, { isNot } from 'styled-is';
import isBoolean from 'lodash.isboolean';
import remcalc from 'remcalc';
import styled from 'styled-components';

import Card, { BaseCard } from './card';

const BaseHeader = styled(BaseCard)`
  flex-direction: row;
  z-index: 1;
  line-height: ${remcalc(24)};
  max-width: 100%;
  border-top: 0;
  border-left: 0;
  border-right: 0;

  ${is('radius')`
    border-radius: ${remcalc(4)};
    border-bottom-right-radius: ${remcalc(0)};
    border-bottom-left-radius: ${remcalc(0)};
  `};

  ${is('parentCollapsed')`
    box-shadow: none;
  `};

  ${isNot('secondary', 'tertiary')`
    ${is('transparent')`
      color: ${props => props.theme.text};
       -webkit-text-fill-color: currentcolor;
    `};
  `};

  ${is('white')`
    color: ${props => props.theme.text};
    -webkit-text-fill-color: currentcolor;
    background: ${props => props.theme.white};
    box-shadow: none;
    border-color: ${props => props.theme.grey};;
  `};

  ${is('disabled')`
    color: ${props => props.theme.text};
    -webkit-text-fill-color: currentcolor;
    border-color: ${props => props.theme.grey};
    box-shadow: none;
  `};
`;

const BaseBox = styled(BaseCard)`
  width: ${remcalc(46)};
  min-width: ${remcalc(46)};
  min-height: ${remcalc(46)};
  max-width: 100%;

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
    -webkit-text-fill-color: currentcolor;
    border-color: ${props => props.theme.grey};
    box-shadow: none;

    &:hover {
      background-color: transparent;
    }
  `};
`;

const BaseMeta = styled(BaseCard)`
  box-sizing: border-box;
  min-height: ${remcalc(47)};
  max-width: 100%;
  width: auto;
  height: auto;

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
      : transparent
        ? secondary
        : secondary || parentPrimary;
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

export default Header;
