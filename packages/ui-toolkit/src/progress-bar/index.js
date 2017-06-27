import React from 'react';
import styled from 'styled-components';
import theme from '../theme';
import Baseline from '../baseline';

const StyledList = styled.ul`
  display: table;
  list-style-type: none;
  background-color: ${theme.white};
  padding: 0;
`;

/**
 * @example ./usage.md
 */
export default ({ children, ...rest }) =>
  <StyledList {...rest}>
    {children}
  </StyledList>;

export { default as ProgressbarItem } from './item';
export { default as ProgressbarButton } from './button';
export { default as Indicator } from './indicator';
