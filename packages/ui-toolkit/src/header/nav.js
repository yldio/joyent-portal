import React from 'react';
import styled from 'styled-components';
import is from 'styled-components';
import remcalc from 'remcalc';

import P from '../text/p';
import typography from '../typography';

const UL = styled.ul`
  padding: 0;
  margin: 0;
  display: flex;
  list-style: none;

  a {
    padding: ${remcalc(15)};
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

    &:hover,
    &.active {
      background: rgba(255, 255, 255, 0.15);
    }
  }
`;

export default ({ children, ...rest }) => <UL {...rest}>{children}</UL>;
