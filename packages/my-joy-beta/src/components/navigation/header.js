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
  HeaderItem,
  QueryBreakpoints
} from 'joyent-ui-toolkit';

const Logo = styled(TritonIcon)`
  padding-top: ${remcalc(11)};
`;

const { Medium } = QueryBreakpoints;

export default () => (
  <Header fluid>
    <HeaderBrand beta>
      <HeaderAnchor to="/">
        <Logo beta light alt="Triton" />
      </HeaderAnchor>
    </HeaderBrand>
    <Medium>
      <HeaderNav>
        <li>
          <HeaderAnchor to="/">Compute</HeaderAnchor>
        </li>
      </HeaderNav>
    </Medium>
    <Medium>
      <HeaderItem>
        <HeaderAnchor href="https://my.joyent.com">
          Return to existing portal
        </HeaderAnchor>
      </HeaderItem>
    </Medium>
    <HeaderItem>
      <HeaderAnchor>
        <DataCenterIcon light />eu-east-1
      </HeaderAnchor>
    </HeaderItem>
    <Medium>
      <HeaderItem>
        <HeaderAnchor>
          <UserIcon light />Nicola
        </HeaderAnchor>
      </HeaderItem>
    </Medium>
  </Header>
);
