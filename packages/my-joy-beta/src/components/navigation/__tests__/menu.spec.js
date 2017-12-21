import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import Menu from '../menu';
import Theme from '@mocks/theme';

it('renders <Menu /> without throwing', () => {
  expect(
    renderer
      .create(
        <Theme>
          <Menu />
        </Theme>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Menu links /> without throwing', () => {
  const links = [
    {
      name: 'summary',
      pathname: '/instances/:name/summary'
    },
    {
      name: 'tags',
      pathname: '/instances/:name/tags'
    },
    {
      name: 'metadata',
      pathname: '/instances/:name/metadata'
    },
    {
      name: 'networks',
      pathname: '/instances/:name/networks'
    },
    {
      name: 'firewall',
      pathname: '/instances/:name/firewall'
    },
    {
      name: 'dns',
      pathname: '/instances/:name/dns'
    },
    {
      name: 'snapshots',
      pathname: '/instances/:name/snapshots'
    }
  ];

  expect(
    renderer
      .create(
        <Theme>
          <Menu links={links} />
        </Theme>
      )
      .toJSON()
  ).toMatchSnapshot();
});
