import React from 'react';
import { Link } from 'react-router-dom';

import {
  Header,
  HeaderBrand,
  TritonBetaIcon,
  HeaderNav,
  HeaderItem,
  DataCenterIconLight,
  UserIconLight,
  HeaderWrapper
} from 'joyent-ui-toolkit';

const NavHeader = () => (
  <Header>
    <HeaderWrapper>
      <HeaderBrand beta>
        <TritonBetaIcon />
      </HeaderBrand>
      <HeaderNav>
        <li>
          <Link class="active" to="#">
            Compute
          </Link>
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

export default NavHeader;
