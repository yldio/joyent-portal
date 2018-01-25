import React from 'react';
import { toMatchImageSnapshot } from 'jest-image-snapshot';
import renderer from 'react-test-renderer';
import screenshot from 'react-screenshot-renderer';

import { Networks } from '../networks';
import Theme from '@mocks/theme';

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

it('<Networks error />', async () => {
  expect(
    await screenshot(
      <Theme ss>
        <Networks error />
      </Theme>
    )
  ).toMatchImageSnapshot();
});

it('<Networks networks />', async () => {
  const networks = [
    {
      id: '1',
      name: 'name',
      description: 'description',
      fabric: true,
      subnet: '255.255.255.0',
      provision_start_ip: '192.168.1.2',
      provision_end_ip: '192.168.1.253',
      machines: [{ name: 'hello' }, { name: 'hello2' }]
    },
    {
      id: '2',
      name: 'name2',
      description: 'description2',
      fabric: false,
      subnet: '255.255.255.0',
      provision_start_ip: '192.168.1.2',
      provision_end_ip: '192.168.1.253'
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
