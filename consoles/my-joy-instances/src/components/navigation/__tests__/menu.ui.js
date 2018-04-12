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
    await screenshot(
      <Theme ss>
        <Menu links={links} />
      </Theme>
    )
  ).toMatchImageSnapshot();
});
