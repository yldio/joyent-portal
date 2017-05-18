import React from 'react';
import styled from 'styled-components';
import remcalc from 'remcalc';
import Baseline from '../baseline';
import typography from '../typography';

const StyledUl = styled.ul`
  ${typography.fontFamily};
  ${typography.semibold};

  list-style-type: none;
  margin-bottom: ${remcalc(33)};
`;

/**
 * @example ./usage.md
 */
const Ul = ({ children, ...rest }) => (
  <StyledUl {...rest}>
    {children}
  </StyledUl>
);

export default Baseline(Ul);
