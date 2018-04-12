import React from 'react';
import styled, { withTheme } from 'styled-components';
import remcalc from 'remcalc';
import is from 'styled-is';

import BaseAnchor from '../anchor';
import { Tfoot, Tr, Th } from '../table';
import { Arrow as BaseArrow } from '../icons';

const Anchor = styled(BaseAnchor)`
  text-decoration: underline;

  ${is('disabled')`
    text-decoration: none;
  `};

  ${is('active')`
    text-decoration: none;
  `};

  ${is('active')`
    padding: ${remcalc(6)};
    background-color: ${props => props.theme.primary};
    border: ${remcalc(1)} solid ${props => props.theme.primaryActive};
    border-radius: ${remcalc(4)};
    color: ${props => props.theme.white};
  `};
`;

const Arrow = styled(BaseArrow)`
  ${is('right')`
    margin-left: ${remcalc(3)};
  `};

  ${is('left')`
    margin-right: ${remcalc(3)};
  `};
`;

export const TableFoot = ({ children, colSpan, ...rest }) => (
  <Tfoot>
    <Tr {...rest}>
      <Th colSpan={colSpan} hasBorder="bottom" middle center>
        {children}
      </Th>
    </Tr>
  </Tfoot>
);

export const Item = withTheme(
  ({
    children,
    next,
    prev,
    disabled,
    to,
    component,
    active,
    theme,
    ...rest
  }) => (
    <Anchor
      disabled={disabled}
      active={active}
      component={active ? null : component}
      to={active ? null : to}
      {...rest}
    >
      {prev ? (
        <Arrow
          left
          direction="right"
          fill={disabled ? theme.grey : theme.primary}
        />
      ) : null}
      {children}
      {next ? (
        <Arrow
          right
          direction="left"
          fill={disabled ? theme.grey : theme.primary}
        />
      ) : null}
    </Anchor>
  )
);
