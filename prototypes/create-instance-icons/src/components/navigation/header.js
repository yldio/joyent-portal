import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import remcalc from 'remcalc';

import {
  Header,
  HeaderBrand,
  TritonIcon,
  HeaderNav,
  HeaderItem,
  DataCenterIcon,
  UserIcon
} from 'joyent-ui-toolkit';

const HeaderBrandStyled = styled(HeaderBrand)`
  margin-top: ${remcalc(6)};
`;

const NavHeader = () => (
  <Header>
    <HeaderBrandStyled>
      <TritonIcon />
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
      <DataCenterIcon light />eu-east-1
    </HeaderItem>
    <HeaderItem>
      <UserIcon light />Nicola
    </HeaderItem>
  </Header>
);

export default NavHeader;
