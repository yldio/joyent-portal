import React from 'react';
import styled, { css } from 'styled-components';
import { A } from 'normalized-styled-components';
import { NavLink as RRNavLink } from 'react-router-dom';
import remcalc from 'remcalc';
import is from 'styled-is';

import Baseline from '../baseline';
import typography from '../typography';

const Li = styled.li`
  ${typography.normal};

  display: inline-block;
  font-size: ${remcalc(15)};
  line-height: 1.6;
  margin-right: ${remcalc(23)};
`;

const style = css`
  ${typography.normal};

  color: ${props => props.theme.secondary};
  text-decoration: none;
  cursor: pointer;

  &.active {
    color: ${props => props.theme.primary};
    cursor: default;
  }

  ${is('active')`
    color: ${props => props.theme.primary};
    cursor: default;
  `};
`;

export const Anchor = Baseline(A.extend`
  /* trick prettier */
  ${style};
`);

export const NavLink = Baseline(styled(RRNavLink)`
  /* trick prettier */
  ${style};
`);

/**
 * @example ./usage.md
 */
const Item = props => {
  const { children, href = '', to = '' } = props;

  const Views = [() => to && NavLink, () => href && Anchor];

  const View = Views.reduce((sel, view) => (sel ? sel : view()), null);
  const _children = View ? <View {...props}>{children}</View> : children;

  return <Li>{_children}</Li>;
};

export default Baseline(Item);
