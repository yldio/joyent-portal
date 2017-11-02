import React from 'react';

import {
  Header,
  HeaderBrand,
  TritonBetaIcon,
  DataCenterIconLight,
  UserIconLight,
  HeaderNav,
  HeaderNavAnchor,
  HeaderItem
} from 'joyent-ui-toolkit';

export default () => (
  <Header>
    <HeaderBrand beta>
      <HeaderNavAnchor to="/">
        <TritonBetaIcon alt="Triton" />
      </HeaderNavAnchor>
    </HeaderBrand>
    <HeaderNav>
      <li>
        <HeaderNavAnchor to="/">Compute</HeaderNavAnchor>
      </li>
    </HeaderNav>
    <HeaderItem>Return to existing portal</HeaderItem>
    <HeaderItem>
      <DataCenterIconLight />eu-east-1
    </HeaderItem>
    <HeaderItem>
      <UserIconLight />Nicola
    </HeaderItem>
  </Header>
);
