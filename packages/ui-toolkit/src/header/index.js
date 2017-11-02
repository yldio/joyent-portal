import React from 'react';
import styled from 'styled-components';
import remcalc from 'remcalc';

import { ViewContainer } from '../layout';

const Container = ViewContainer.extend`
  display: flex;
  flex-wrap: nowrap;
  align-content: stretch;
  align-items: stretch;
  max-height: ${remcalc(53)};
  min-height: ${remcalc(53)};
`;

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
`;

/**
 * @example ./usage.md
 */
export default ({ children, ...rest }) => (
  <Header {...rest}>
    <Container>{children}</Container>
  </Header>
);

export { default as HeaderItem } from './item';
export { default as HeaderBrand } from './brand';
export { default as HeaderNav, Anchor as HeaderNavAnchor } from './nav';
