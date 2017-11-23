import React from 'react';
import styled from 'styled-components';
import remcalc from 'remcalc';
import is from 'styled-is';

import Basealign from '../basealign';
import { ViewContainer } from '../layout';

const Container = ViewContainer.extend`
  display: flex;
  flex-wrap: nowrap;
  align-content: stretch;
  align-items: stretch;
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
  line-height: ${remcalc(25)};

  ${is('fixed')`
    position: fixed;
    left: 0;
    right: 0;
  `};

  ${is('bottom', 'fixed')`
    bottom: 0;
  `};
`;

/**
 * @example ./usage.md
 */
export default Basealign(({ children, fluid, ...rest }) => (
  <Header {...rest}>
    <Container fluid={fluid}>{children}</Container>
  </Header>
));

export { default as HeaderItem, Anchor as HeaderAnchor } from './item';
export { default as HeaderBrand } from './brand';
export { default as HeaderNav } from './nav';
