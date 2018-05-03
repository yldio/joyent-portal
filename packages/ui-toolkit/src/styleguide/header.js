import React from 'react';
import styled from 'styled-components';
import remcalc from 'remcalc';

import Logo from './logo';
import GHLogo from './ghlogo';

const Header = styled.header`
  background: ${props => props.theme.greyDarker};
  color: ${props => props.theme.white};
  height: ${remcalc(48)};
  padding: 0 ${remcalc(24)};
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  z-index: 2;
`;

const List = styled.ul`
  list-style: none;
  display: flex;
  margin: 0;
  padding: 0;

  li {
    a {
      color: ${props => props.theme.white};
      text-decoration: none;
    }

    &:not(:last-child) {
      border-right: ${remcalc(1)} solid ${props => props.theme.text};
      padding-right: ${remcalc(24)};
      margin-right: ${remcalc(24)};
    }
  }
`;

export default () => (
  <Header>
    <List>
      <li>
        <a href="/">Visuals</a>
      </li>
      <li>Copy Guide</li>
      <li>
        <a href="#!/Download">Downloads</a>
      </li>
    </List>
    {decodeURIComponent(window.location.href).split('/#!/')[1] !== '/' ? (
      <Logo />
    ) : null}
    <a
      href="https://github.com/yldio/joyent-portal/tree/master/packages/ui-toolkit"
      rel="noopener noreferrer"
      target="_blank"
    >
      <GHLogo />
    </a>
  </Header>
);
