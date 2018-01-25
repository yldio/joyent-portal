import React from 'react';
import { toMatchImageSnapshot } from 'jest-image-snapshot';
import renderer from 'react-test-renderer';
import screenshot from 'react-screenshot-renderer';

import { Summary } from '../summary';
import Theme from '@mocks/theme';

expect.extend({
  toMatchImageSnapshot
});

it('<Summary />', async () => {
  expect(
    await screenshot(
      <Theme ss>
        <Summary />
      </Theme>
    )
  ).toMatchImageSnapshot();
});

it('<Summary loading />', async () => {
  expect(
    await screenshot(
      <Theme ss>
        <Summary loading />
      </Theme>
    )
  ).toMatchImageSnapshot();
});

it('<Summary loadingError />', async () => {
  expect(
    await screenshot(
      <Theme ss>
        <Summary loadingError />
      </Theme>
    )
  ).toMatchImageSnapshot();
});

it('<Summary mutationError />', async () => {
  expect(
    await screenshot(
      <Theme ss>
        <Summary mutationError="some mutation error" />
      </Theme>
    )
  ).toMatchImageSnapshot();
});

it('<Summary starting stopping rebooting removing />', async () => {
  expect(
    await screenshot(
      <Theme ss>
        <Summary starting stopping rebooting removing />
      </Theme>
    )
  ).toMatchImageSnapshot();
});

it('<Summary starting stopping rebooting removing />', async () => {
  const instance1 = {
    id: '2252839a-e698-ceec-afac-9549ad0c6624',
    // eslint-disable-next-line camelcase
    compute_node: '70bb1cee-dba3-11e3-a799-002590e4f2b0',
    image: {
      id: '19aa3328-0025-11e7-a19a-c39077bfd4cf',
      name: 'Alpine 3'
    },
    // eslint-disable-next-line camelcase
    primary_ip: '72.2.119.146',
    ips: ['72.2.119.146', '10.112.5.63'],
    package: {
      name: 'g4-highcpu-128M'
    },
    brand: 'KVM',
    state: 'RUNNING'
  };

  expect(
    await screenshot(
      <Theme ss>
        <Summary instance={instance1} />
      </Theme>
    )
  ).toMatchImageSnapshot();

  const instance2 = {
    id: '2252839a-e698-ceec-afac-9549ad0c6624',
    // eslint-disable-next-line camelcase
    compute_node: '70bb1cee-dba3-11e3-a799-002590e4f2b0',
    image: {
      id: '19aa3328-0025-11e7-a19a-c39077bfd4cf'
    },
    // eslint-disable-next-line camelcase
    primary_ip: '72.2.119.146',
    ips: ['72.2.119.146', '10.112.5.63'],
    package: {
      name: 'g4-highcpu-128M'
    },
    brand: 'LX',
    state: 'RUNNING'
  };

  expect(
    await screenshot(
      <Theme ss>
        <Summary instance={instance2} />
      </Theme>
    )
  ).toMatchImageSnapshot();
});
