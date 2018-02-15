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
      pathname: '/:name/summary'
    },
    {
      name: 'tags',
      pathname: '/:name/tags'
    },
    {
      name: 'metadata',
      pathname: '/:name/metadata'
    },
    {
      name: 'networks',
      pathname: '/:name/networks'
    },
    {
      name: 'firewall',
      pathname: '/:name/firewall'
    },
    {
      name: 'dns',
      pathname: '/:name/dns'
    },
    {
      name: 'snapshots',
      pathname: '/:name/snapshots'
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
