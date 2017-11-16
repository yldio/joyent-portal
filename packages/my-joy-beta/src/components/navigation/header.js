import React from 'react';
import styled from 'styled-components';
import remcalc from 'remcalc';

import {
  Header,
  HeaderBrand,
  TritonBetaIcon,
  DataCenterIconLight,
  UserIconLight,
  HeaderNav,
  HeaderAnchor,
  HeaderItem
} from 'joyent-ui-toolkit';

const Logo = styled(TritonBetaIcon)`
  padding-top: ${remcalc(11)};
`;

export default () => (
  <Header fluid>
    <HeaderBrand beta>
      <HeaderAnchor to="/">
        <Logo alt="Triton" />
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
        <DataCenterIconLight />eu-east-1
      </HeaderAnchor>
    </HeaderItem>
    <HeaderItem>
      <HeaderAnchor>
        <UserIconLight />Nicola
      </HeaderAnchor>
    </HeaderItem>
  </Header>
);
