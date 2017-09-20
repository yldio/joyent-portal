import React from 'react';
import { Link } from 'react-router-dom';
import { Img } from 'normalized-styled-components';
import remcalc from 'remcalc';

import Logo from '@assets/triton_logo.png';
import { Header, HeaderBrand, ViewContainer } from 'joyent-ui-toolkit';

const StyledLogo = Img.extend`
  width: ${remcalc(87)};
  height: ${remcalc(25)};
`;

export default () => (
  <Header>
    <ViewContainer>
      <HeaderBrand>
        <Link to="/">
          <StyledLogo src={Logo} alt="Triton" />
        </Link>
      </HeaderBrand>
    </ViewContainer>
  </Header>
);
