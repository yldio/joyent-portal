import React from 'react';
import { Link } from 'react-router-dom';
import { Img } from 'normalized-styled-components';
import remcalc from 'remcalc';

import Logo from '@assets/triton_logo.png';
import { Header, HeaderBrand } from 'joyent-ui-toolkit';

const StyledLogo = Img.extend`
  width: ${remcalc(87)};
  height: ${remcalc(25)};
`;

const NavHeader = () => (
  <Header>
    <HeaderBrand>
      <Link to="/" name="Go to home">
        <StyledLogo src={Logo} alt="Triton Logo"/>
      </Link>
    </HeaderBrand>
  </Header>
);

export default NavHeader;
