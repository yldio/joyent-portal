import React from 'react';
import styled from 'styled-components';
import remcalc from 'remcalc';

const List = styled.ul`
  background: ${props => props.theme.background};
  display: flex;
  list-style: none;
  padding: ${remcalc(12)} ${remcalc(18)};
  border-top: ${remcalc(1)} solid ${props => props.theme.grey};
  width: 100%;
  justify-content: flex-end;
  position: absolute;
  box-sizing: border-box;
  bottom: 0;
`;

const ListItem = styled.li`
  color: ${props => props.theme.greyDark};
  &:not(:last-child) {
    padding-right: ${remcalc(24)};
  }
`;

const Link = styled.a`
  color: ${props => props.theme.greyDark};
  text-decoration: none;
`;

const Brand = styled.span`
  font-weight: ${props => props.theme.font.weight.semibold};
`;

export default () => (
  <List>
    <ListItem>
      <Link
        href="https://www.joyent.com/about/policies"
        target="__blank"
        rel="noopener noreferrer"
      >
        Policies
      </Link>
    </ListItem>
    <ListItem>
      <Link
        href="https://www.joyent.com/networking-and-security/security-compliance"
        target="__blank"
        rel="noopener noreferrer"
      >
        Compliance
      </Link>
    </ListItem>
    <ListItem>
      <Brand>© {new Date().getFullYear()} Joyent, Inc.</Brand>
    </ListItem>
  </List>
);

export { default as StickyFooter } from './sticky-footer';
