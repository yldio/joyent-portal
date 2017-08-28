import React from 'react';
import styled, { css } from 'styled-components';
import { A } from 'normalized-styled-components';
import { NavLink as RRNavLink, Link as RRLink } from 'react-router-dom';
import remcalc from 'remcalc';

import Baseline from '../baseline';
import typography from '../typography';

const Li = styled.li`
  ${typography.fontFamily};
  ${typography.normal};

  display: inline-block;
  font-size: ${remcalc(15)};
  line-height: 1.6;
  margin-right: ${remcalc(23)};
`;

const Item = ({ children, ...rest }) => <Li {...rest}>{children}</Li>;

export default Baseline(Item);

const style = css`
  ${typography.fontFamily};
  ${typography.normal};

  color: ${props => props.theme.secondary};
  text-decoration: none;
  cursor: pointer;

  &.active {
    color: ${props => props.theme.primary};
    cursor: default;
  }
`;

export const Anchor = Baseline(A.extend`
  ${style};
`);

export const NavLink = Baseline(styled(RRNavLink)`
  ${style};
`);

export const Link = Baseline(styled(RRLink)`
  ${style};
`);
