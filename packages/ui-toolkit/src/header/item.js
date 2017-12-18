import React from 'react';
import styled from 'styled-components';
import remcalc from 'remcalc';

import BaseAnchor from '../anchor';
import P from '../text/p';

const Text = P.extend`
  text-align: center;
  color: ${props => props.theme.white};
  -webkit-text-fill-color: currentcolor;
  margin: 0;
`;

const Box = styled.section`
  flex: 0 1 auto;
  align-self: auto;
  order: 0;
  display: flex;
  align-items: center;
  padding: 0 ${remcalc(18)};

  svg {
    margin-right: ${remcalc(6)};
  }

  &:not(:last-of-type) {
    border-right: ${remcalc(1)} solid rgba(255, 255, 255, 0.15);
  }

  &:first-of-type {
    margin-left: auto;
  }

  &:hover,
  &.active {
    background: rgba(255, 255, 255, 0.15);
  }
`;

export const Anchor = styled(BaseAnchor)`
  padding: ${remcalc(15)} 0;
  line-height: ${remcalc(24)};
  font-size: ${remcalc(15)};
  color: ${props => props.theme.white};
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 200ms ease;
  max-height: ${remcalc(53)};
  min-height: ${remcalc(53)};
  box-sizing: border-box;
`;

export default ({ children, ...rest }) => (
  <Box {...rest}>
    <Text>{children}</Text>
  </Box>
);
