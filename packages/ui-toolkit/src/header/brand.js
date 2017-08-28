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
  flex: 1 1 auto;
  align-self: stretch;
  order: 0;

  padding: ${remcalc(15)} 0;
`;

export default ({ children, ...rest }) => (
  <Box {...rest}>
    <Brand>{children}</Brand>
  </Box>
);
