import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Img } from 'normalized-styled-components';
import remcalc from 'remcalc';
import styled from 'styled-components';

import Logo from '@assets/triton_logo.png';
import {
  Header,
  HeaderBrand,
  HeaderItem,
  DataCenterIcon,
  UserIcon
} from 'joyent-ui-toolkit';
const StyledLogo = Img.extend`
  width: ${remcalc(87)};
  height: ${remcalc(25)};
`;

const Item = styled.span`
  padding-left: 5px;
`;

const NavHeader = ({ datacenter, username }) => (
  <Header>
    <HeaderBrand>
      <Link to="/">
        <StyledLogo src={Logo} />
      </Link>
    </HeaderBrand>
    <HeaderItem>
      <DataCenterIcon />
      <Item>{datacenter}</Item>
    </HeaderItem>
    <HeaderItem>
      <UserIcon />
      <Item>{username}</Item>
    </HeaderItem>
  </Header>
);

NavHeader.propTypes = {
  datacenter: PropTypes.string,
  username: PropTypes.string
};

export default NavHeader;
