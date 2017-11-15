import React from 'react';
import { Link } from 'react-router-dom';

import {
  Header,
  HeaderBrand,
  TritonBetaIcon,
  HeaderNav,
  HeaderItem,
  DataCenterIconLight,
  UserIconLight
} from 'joyent-ui-toolkit';

const NavHeader = () => (
  <Header>
    <HeaderBrand beta>
      <TritonBetaIcon />
    </HeaderBrand>
    <HeaderNav>
      <li>
        <Link className="active" to="/">
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
  </Header>
);

export default NavHeader;
