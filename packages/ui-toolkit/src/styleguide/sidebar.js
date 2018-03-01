import React from 'react';
import remcalc from 'remcalc';
import { H3 } from '../';
import styled from 'styled-components';

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

const Header = styled(H3)`
  color: #979797;
  font-size: ${remcalc(18)};
  margin-bottom: ${remcalc(12)};
  margin-top: ${remcalc(12)};
`;

const Link = styled.a`
  color: #979797;
  text-decoration: none;
`

export default ({ children: { props } }) => {
  const items = props.items.filter(item => item.name);

  if (!items.length) {
    return null;
  }

  return (
    <List>
      {items.map(({ heading, name, slug, content }) => (
        <li key={name}>
          <Header><Link href={`/#${slug}`}>{name}</Link></Header>
          {content}
        </li>
      ))}
    </List>
  );
};
