import React from 'react';
import { Link } from 'react-router-dom';

import {
  Header,
  HeaderBrand,
  HeaderWrapper,
  TritonBetaIcon,
  DataCenterIconLight,
  UserIconLight,
  HeaderNav,
  HeaderItem
} from 'joyent-ui-toolkit';

export default () => (
  <Header>
    <HeaderWrapper>
      <HeaderBrand beta>
        <Link to="/">
          <TritonBetaIcon alt="Triton" />
        </Link>
      </HeaderBrand>
      <HeaderNav>
        <li>
          <Link to="/">Compute</Link>
        </li>
      </HeaderNav>
      <HeaderItem>Return to existing portal</HeaderItem>
      <HeaderItem>
        <DataCenterIconLight />eu-east-1
      </HeaderItem>
      <HeaderItem>
        <UserIconLight />Nicola
      </HeaderItem>
    </HeaderWrapper>
  </Header>
);
