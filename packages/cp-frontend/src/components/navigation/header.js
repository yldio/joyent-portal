import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Img } from 'normalized-styled-components';
import remcalc from 'remcalc';

import Logo from '@assets/triton_logo.png';
import { Header, HeaderBrand, HeaderItem } from 'joyent-ui-toolkit';

const StyledLogo = Img.extend`
  width: ${remcalc(87)};
  height: ${remcalc(25)};
`;

const NavHeader = ({ datacenter, username }) =>
  <Header>
    <HeaderBrand>
      <Link to="/">
        <StyledLogo src={Logo} />
      </Link>
    </HeaderBrand>
    <HeaderItem>{datacenter}</HeaderItem>
    <HeaderItem>{username}</HeaderItem>
  </Header>;

NavHeader.propTypes = {
  datacenter: PropTypes.string,
  username: PropTypes.string
};

export default NavHeader;
