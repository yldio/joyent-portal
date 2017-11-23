import React from 'react';
import styled from 'styled-components';
import remcalc from 'remcalc';

import {
  Header,
  HeaderBrand,
  TritonIcon,
  DataCenterIcon,
  UserIcon,
  HeaderNav,
  HeaderAnchor,
  HeaderItem
} from 'joyent-ui-toolkit';

const Logo = styled(TritonIcon)`
  padding-top: ${remcalc(11)};
`;

export default () => (
  <Header fluid>
    <HeaderBrand beta>
      <HeaderAnchor to="/">
        <Logo beta alt="Triton" />
      </HeaderAnchor>
    </HeaderBrand>
    <HeaderNav>
      <li>
        <HeaderAnchor to="/">Compute</HeaderAnchor>
      </li>
    </HeaderNav>
    <HeaderItem>
      <HeaderAnchor href="https://my.joyent.com">
        Return to existing portal
      </HeaderAnchor>
    </HeaderItem>
    <HeaderItem>
      <HeaderAnchor>
        <DataCenterIcon light />eu-east-1
      </HeaderAnchor>
    </HeaderItem>
    <HeaderItem>
      <HeaderAnchor>
        <UserIcon light />Nicola
      </HeaderAnchor>
    </HeaderItem>
  </Header>
);
