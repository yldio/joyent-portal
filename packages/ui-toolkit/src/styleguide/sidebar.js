import React from 'react';
import remcalc from 'remcalc';
import styled from 'styled-components';
import is from 'styled-is';

const List = styled.ul`
  list-style: none;
  padding: 0;

  ul.rsg--list-1 {
    padding-left: ${remcalc(6)};
  }

  a.rsg--link-6 {
    color: ${props => props.theme.text};
    margin-bottom: ${remcalc(6)};
  }
`;

const Header = styled.p`
  line-height: ${remcalc(24)};
  color: ${props => props.theme.text};
  font-size: ${remcalc(15)};
  padding-bottom: ${remcalc(12)};
  padding-top: ${remcalc(12)};
  padding-left: ${remcalc(24)};
  margin: ${remcalc(0)};

  ${is('active')`
    background: ${props => props.theme.background};
  `};
`;

const Link = styled.a`
  color: ${props => props.theme.text};
  text-decoration: none;

  ${is('active')`
    color: ${props => props.theme.primary};
    font-weight: 600;
  `};
`;

export default ({ children: { props } }) => {
  const items = props.items.filter(item => item.name);
  const link = decodeURIComponent(window.location.href).split('/#!/')[1] || '/';
  const isActive = name =>
    link === name || (name === 'Color Palette' && link === '/');

  if (!items.length) {
    return null;
  }

  return (
    <List>
      {items.map(({ heading, name, slug, content }) => (
        <li key={name}>
          <Header active={isActive(name)}>
            <Link active={isActive(name)} href={`/#!/${name}`}>
              {name}
            </Link>
          </Header>
          {content}
        </li>
      ))}
    </List>
  );
};
