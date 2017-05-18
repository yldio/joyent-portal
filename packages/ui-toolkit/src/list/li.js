import React from 'react';
import styled from 'styled-components';
import remcalc from 'remcalc';
import Baseline from '../baseline';

const StyledLi = styled.li`
  display: inline-block;

  & + & {
    margin-left: ${remcalc(24)};
  }

  & a {
    color: ${props => props.theme.text};
    text-decoration: none;
    padding-bottom: ${remcalc(6)};

    &.active {
      cursor: default;
      color: ${props => props.theme.primary};
      border-bottom: ${remcalc(2)} solid ${props => props.theme.primary};
    }
  }
`;

/**
 * @example ./usage.md
 */
const Li = ({ children, ...rest }) => (
  <StyledLi {...rest}>
    {children}
  </StyledLi>
);

export default Baseline(Li);
