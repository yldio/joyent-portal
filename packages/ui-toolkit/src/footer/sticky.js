import React from 'react';
import styled from 'styled-components';
import is from 'styled-is';
import remcalc from 'remcalc';

import { ViewContainer } from '../layout';

const Container = styled(ViewContainer)`
  display: flex;
  flex-wrap: nowrap;
  align-content: stretch;
  align-items: stretch;
  background: ${props =>
    props.fill
      ? props.theme[props.fill] ? props.theme[props.fill] : props.fill
      : props.theme.background};
`;

const Footer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-content: stretch;
  align-items: stretch;
  background-color: ${props =>
    props.fill
      ? props.theme[props.fill] ? props.theme[props.fill] : props.fill
      : 'rgba(241, 241, 241, 1)'};
  border-top: ${remcalc(1)} solid ${props => props.theme.grey};
  line-height: ${remcalc(25)};
  height: ${remcalc(70)};
  z-index: 1;

  ${is('auto')`
    height: auto;
  `};

  ${is('borderless')`
    border: none;
  `};

  ${is('fixed')`
    position: fixed;
    left: 0;
    right: 0;
  `};

  ${is('bottom', 'fixed')`
    bottom: 0;
  `};

  ${is('top', 'fixed')`
    top: 0;
  `};
`;

export default ({ children, fluid, innerFill, ...rest }) => (
  <Footer {...rest}>
    <Container fill={innerFill || rest.fill} fluid={fluid}>
      {children}
    </Container>
  </Footer>
);
