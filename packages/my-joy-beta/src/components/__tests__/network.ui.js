import React from 'react';
import { toMatchImageSnapshot } from 'jest-image-snapshot';
import renderer from 'react-test-renderer';
import screenshot from 'react-screenshot-renderer';

import { Collapsed, Expanded } from '../network';
import Theme from '@mocks/theme';

expect.extend({
  toMatchImageSnapshot
});

it('<Network />', async () => {
  expect(
    await screenshot(
      <Theme ss>
        <Expanded />
      </Theme>
    )
  ).toMatchImageSnapshot();

  expect(
    await screenshot(
      <Theme ss>
        <Collapsed />
      </Theme>
    )
  ).toMatchImageSnapshot();
});

it('<Network {...network} />', async () => {
  const network = {
    id: '1',
    name: 'name',
    description: 'description',
    fabric: false,
    subnet: '255.255.255.0',
    provision_start_ip: '192.168.1.2',
    provision_end_ip: '192.168.1.253',
    selected: false,
    infoExpanded: false
  };

  expect(
    await screenshot(
      <Theme ss>
        <Expanded {...network} />
      </Theme>
    )
  ).toMatchImageSnapshot();

  expect(
    await screenshot(
      <Theme ss>
        <Collapsed {...network} />
      </Theme>
    )
  ).toMatchImageSnapshot();
});

it('<Network {...network} />', async () => {
  const network = {
    id: '1',
    name: 'name',
    description: 'description',
    fabric: false,
    subnet: '255.255.255.0',
    provision_start_ip: '192.168.1.2',
    provision_end_ip: '192.168.1.253',
    selected: false,
    infoExpanded: false
  };

  expect(
    await screenshot(
      <Theme ss>
        <Expanded {...network} />
      </Theme>
    )
  ).toMatchImageSnapshot();

  expect(
    await screenshot(
      <Theme ss>
        <Collapsed {...network} />
      </Theme>
    )
  ).toMatchImageSnapshot();
});

it('<Network {...network} public />', async () => {
  const network = {
    id: '1',
    name: 'name',
    description: 'description',
    fabric: false,
    subnet: '255.255.255.0',
    provision_start_ip: '192.168.1.2',
    provision_end_ip: '192.168.1.253',
    selected: false,
    infoExpanded: false,
    public: true
  };

  expect(
    await screenshot(
      <Theme ss>
        <Expanded {...network} />
      </Theme>
    )
  ).toMatchImageSnapshot();

  expect(
    await screenshot(
      <Theme ss>
        <Collapsed {...network} />
      </Theme>
    )
  ).toMatchImageSnapshot();
});

it('<Network {...network} fabric />', async () => {
  const network = {
    id: '1',
    name: 'name',
    description: 'description',
    fabric: true,
    subnet: '255.255.255.0',
    provision_start_ip: '192.168.1.2',
    provision_end_ip: '192.168.1.253',
    selected: false,
    infoExpanded: false
  };

  expect(
    await screenshot(
      <Theme ss>
        <Expanded {...network} />
      </Theme>
    )
  ).toMatchImageSnapshot();

  expect(
    await screenshot(
      <Theme ss>
        <Collapsed {...network} />
      </Theme>
    )
  ).toMatchImageSnapshot();
});

it('<Network {...network} infoExpanded />', async () => {
  const network = {
    id: '1',
    name: 'name',
    description: 'description',
    fabric: true,
    subnet: '255.255.255.0',
    provision_start_ip: '192.168.1.2',
    provision_end_ip: '192.168.1.253',
    selected: false,
    infoExpanded: true
  };

  expect(
    await screenshot(
      <Theme ss>
        <Expanded {...network} />
      </Theme>
    )
  ).toMatchImageSnapshot();

  expect(
    await screenshot(
      <Theme ss>
        <Collapsed {...network} />
      </Theme>
    )
  ).toMatchImageSnapshot();
});
