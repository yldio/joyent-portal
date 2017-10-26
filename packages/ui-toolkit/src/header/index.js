import React from 'react';
import styled from 'styled-components';
import remcalc from 'remcalc';
import is from 'styled-is';

const Header = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-content: stretch;
  align-items: stretch;
  background-color: ${props => props.theme.brandBackground};
  max-height: ${remcalc(53)};
  min-height: ${remcalc(53)};
  padding-left: ${remcalc(18)};
  line-height: ${remcalc(25)};

  & > div[class*='Grid'] {
    display: flex;
    flex-wrap: nowrap;
    align-content: stretch;
    align-items: stretch;
    max-height: ${remcalc(53)};
    min-height: ${remcalc(53)};
  }
`;

/**
 * @example ./usage.md
 */
export default ({ children, ...rest }) => <Header {...rest}>{children}</Header>;

export { default as HeaderBrand } from './brand';
export { default as HeaderItem } from './item';
export { default as HeaderNav } from './nav';
