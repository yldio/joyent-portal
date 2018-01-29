import React from 'react';
import { toMatchImageSnapshot } from 'jest-image-snapshot';
import screenshot from 'react-screenshot-renderer';

import Menu from '../menu';
import Theme from '@mocks/theme';

expect.extend({
  toMatchImageSnapshot
});

it('<Menu />', async () => {
  expect(
    await screenshot(
      <Theme ss>
        <Menu />
      </Theme>
    )
  ).toMatchImageSnapshot();
});

it('<Menu links />', async () => {
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
    await screenshot(
      <Theme ss>
        <Menu links={links} />
      </Theme>
    )
  ).toMatchImageSnapshot();
});
