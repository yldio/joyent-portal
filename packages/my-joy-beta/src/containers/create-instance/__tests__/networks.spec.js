/* eslint-disable camelcase */
import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import Theme from '@mocks/theme';
import { Networks } from '../networks';

it('renders <Networks /> without throwing', () => {
  expect(
    renderer
      .create(
        <Theme>
          <Networks />
        </Theme>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Networks loading /> without throwing', () => {
  expect(
    renderer
      .create(
        <Theme>
          <Networks loading />
        </Theme>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Networks loading expanded /> without throwing', () => {
  expect(
    renderer
      .create(
        <Theme>
          <Networks loading expanded />
        </Theme>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Networks networks=[] /> without throwing', () => {
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
    renderer
      .create(
        <Theme>
          <Networks networks={networks} />
        </Theme>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Networks networks=[] expanded /> without throwing', () => {
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
    renderer
      .create(
        <Theme>
          <Networks networks={networks} expanded />
        </Theme>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Networks networks=[] proceeded /> without throwing', () => {
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
    renderer
      .create(
        <Theme>
          <Networks networks={networks} proceeded />
        </Theme>
      )
      .toJSON()
  ).toMatchSnapshot();
});
