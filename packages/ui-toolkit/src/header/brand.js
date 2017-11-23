import React from 'react';
import styled from 'styled-components';
import remcalc from 'remcalc';

import { H2 } from '../text/headings';

const Brand = H2.extend`
  text-transform: uppercase;
  color: ${props => props.theme.white};
  font-size: ${remcalc(29)};
  margin: 0;
`;

const Box = styled.div`
  align-self: stretch;
  order: 0;
  width: ${remcalc(150)};
  display: flex;

  &:hover,
  &.active {
    background: rgba(255, 255, 255, 0.15);
  }
`;

export default ({ children, ...rest }) => (
  <Box {...rest}>
    <Brand {...rest}>{children}</Brand>
  </Box>
);
