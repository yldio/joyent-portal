import React from 'react';
import styled from 'styled-components';
import remcalc from 'remcalc';

import P from '../text/p';

const Text = P.extend`
  text-align: center;
  color: ${props => props.theme.white};
  margin: 0;

  a {
    color: ${props => props.theme.white};
    text-decoration: none;
  }
`;

const Box = styled.section`
  flex: 0 1 auto;
  align-self: auto;
  order: 0;
  display: flex;
  align-items: center;
  padding: ${remcalc(15)};

  svg {
    margin-right: ${remcalc(6)};
  }

  &:not(:last-of-type) {
    border-right: ${remcalc(1)} solid rgba(255, 255, 255, 0.15);
  }

  &:first-of-type {
    margin-left: auto;
  }
`;

export default ({ children, ...rest }) => (
  <Box {...rest}>
    <Text>{children}</Text>
  </Box>
);
