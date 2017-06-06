import React from 'react';
import styled from 'styled-components';
import remcalc from 'remcalc';

import P from '../text/p';
import typography from '../typography';

const Text = P.extend`
  ${typography.semibold};

  text-align: center;
  color: ${props => props.theme.white};
  margin: 0;
`;

const Box = styled.div`
  flex: 0 1 auto;
  align-self: auto;
  order: 0;

  padding: ${remcalc(15)} 0;
  width: ${remcalc(100)};
  max-width: ${remcalc(100)};
`;

export default ({ children, ...rest }) => (
  <Box xs={3} sm={2} md={2} end {...rest}>
    <Text>
      {children}
    </Text>
  </Box>
);
