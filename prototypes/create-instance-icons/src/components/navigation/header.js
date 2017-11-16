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

  // ${is('beta')`
  // &:hover,
  //   align-items: center;
  // &.active {
  //   margin-top: ${remcalc(6)}
  //   background: rgba(255, 255, 255, 0.15);
  // `}

const NavHeader = () => (
  <Header>
    <HeaderBrand>
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
