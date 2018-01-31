/* eslint-disable camelcase */
import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { Collapsed, Expanded } from '../network';
import Theme from '@mocks/theme';

it('renders <Network /> without throwing', () => {
  expect(
    renderer
      .create(
        <Theme>
          <Expanded />
        </Theme>
      )
      .toJSON()
  ).toMatchSnapshot();

  expect(
    renderer
      .create(
        <Theme>
          <Collapsed />
        </Theme>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Network {...network} /> without throwing', () => {
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
    renderer
      .create(
        <Theme>
          <Expanded {...network} />
        </Theme>
      )
      .toJSON()
  ).toMatchSnapshot();

  expect(
    renderer
      .create(
        <Theme>
          <Collapsed {...network} />
        </Theme>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Network {...network} /> without throwing', () => {
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
    renderer
      .create(
        <Theme>
          <Expanded {...network} />
        </Theme>
      )
      .toJSON()
  ).toMatchSnapshot();

  expect(
    renderer
      .create(
        <Theme>
          <Collapsed {...network} />
        </Theme>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Network {...network} public /> without throwing', () => {
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
    renderer
      .create(
        <Theme>
          <Expanded {...network} />
        </Theme>
      )
      .toJSON()
  ).toMatchSnapshot();

  expect(
    renderer
      .create(
        <Theme>
          <Collapsed {...network} />
        </Theme>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Network {...network} fabric /> without throwing', () => {
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
    renderer
      .create(
        <Theme>
          <Expanded {...network} />
        </Theme>
      )
      .toJSON()
  ).toMatchSnapshot();

  expect(
    renderer
      .create(
        <Theme>
          <Collapsed {...network} />
        </Theme>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Network {...network} infoExpanded /> without throwing', () => {
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
    renderer
      .create(
        <Theme>
          <Expanded {...network} />
        </Theme>
      )
      .toJSON()
  ).toMatchSnapshot();

  expect(
    renderer
      .create(
        <Theme>
          <Collapsed {...network} />
        </Theme>
      )
      .toJSON()
  ).toMatchSnapshot();
});
