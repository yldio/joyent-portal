/* eslint-disable camelcase */
import React from 'react';
import { toMatchImageSnapshot } from 'jest-image-snapshot';
import screenshot from 'react-screenshot-renderer';

import Theme from '@mocks/theme';
import { Networks } from '../networks';

expect.extend({
  toMatchImageSnapshot
});

it('<Networks />', async () => {
  expect(
    await screenshot(
      <Theme ss>
        <Networks />
      </Theme>
    )
  ).toMatchImageSnapshot();
});

it('<Networks loading />', async () => {
  expect(
    await screenshot(
      <Theme ss>
        <Networks loading />
      </Theme>
    )
  ).toMatchImageSnapshot();
});

it('<Networks loading expanded />', async () => {
  expect(
    await screenshot(
      <Theme ss>
        <Networks loading expanded />
      </Theme>
    )
  ).toMatchImageSnapshot();
});

it('<Networks networks=[] />', async () => {
  const networks = [
    {
      id: '1',
      name: 'name',
      description: 'description',
      fabric: true,
      subnet: '255.255.255.0',
      provision_start_ip: '192.168.1.2',
      provision_end_ip: '192.168.1.253',
      selected: false
    },
    {
      id: '2',
      name: 'name2',
      description: 'description2',
      fabric: false,
      subnet: '255.255.255.0',
      provision_start_ip: '192.168.1.2',
      provision_end_ip: '192.168.1.253',
      selected: true
    }
  ];

  expect(
    await screenshot(
      <Theme ss>
        <Networks networks={networks} />
      </Theme>
    )
  ).toMatchImageSnapshot();
});

it('<Networks networks=[] expanded />', async () => {
  const networks = [
    {
      id: '1',
      name: 'name',
      description: 'description',
      fabric: true,
      subnet: '255.255.255.0',
      provision_start_ip: '192.168.1.2',
      provision_end_ip: '192.168.1.253',
      selected: false
    },
    {
      id: '2',
      name: 'name2',
      description: 'description2',
      fabric: false,
      subnet: '255.255.255.0',
      provision_start_ip: '192.168.1.2',
      provision_end_ip: '192.168.1.253',
      selected: true
    }
  ];

  expect(
    await screenshot(
      <Theme ss>
        <Networks networks={networks} expanded />
      </Theme>
    )
  ).toMatchImageSnapshot();
});

it('<Networks networks=[] proceeded />', async () => {
  const networks = [
    {
      id: '1',
      name: 'name',
      description: 'description',
      fabric: true,
      subnet: '255.255.255.0',
      provision_start_ip: '192.168.1.2',
      provision_end_ip: '192.168.1.253',
      selected: false
    },
    {
      id: '2',
      name: 'name2',
      description: 'description2',
      fabric: false,
      subnet: '255.255.255.0',
      provision_start_ip: '192.168.1.2',
      provision_end_ip: '192.168.1.253',
      selected: true
    }
  ];

  expect(
    await screenshot(
      <Theme ss>
        <Networks networks={networks} proceeded />
      </Theme>
    )
  ).toMatchImageSnapshot();
});
