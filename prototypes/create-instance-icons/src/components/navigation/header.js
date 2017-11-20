import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import remcalc from 'remcalc';

import {
  Header,
  HeaderBrand,
  TritonBetaIcon,
  HeaderNav,
  HeaderItem,
  DataCenterIconLight,
  UserIconLight
} from 'joyent-ui-toolkit';

const HeaderBrandStyled = styled(HeaderBrand)`
  margin-top: ${remcalc(6)};
`;

const NavHeader = () => (
  <Header>
    <HeaderBrandStyled>
      <TritonBetaIcon />
    </HeaderBrandStyled>
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
