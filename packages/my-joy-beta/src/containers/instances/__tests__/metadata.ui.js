import React from 'react';
import { toMatchImageSnapshot } from 'jest-image-snapshot';
import renderer from 'react-test-renderer';
import screenshot from 'react-screenshot-renderer';

import { Metadata } from '../metadata';
import Theme from '@mocks/theme';

expect.extend({
  toMatchImageSnapshot
});

it('<Metadata />', async () => {
  expect(
    await screenshot(
      <Theme ss>
        <Metadata />
      </Theme>
    )
  ).toMatchImageSnapshot();
});

it('<Metadata loading />', async () => {
  expect(
    await screenshot(
      <Theme ss>
        <Metadata loading />
      </Theme>
    )
  ).toMatchImageSnapshot();
});

it('<Metadata error />', async () => {
  expect(
    await screenshot(
      <Theme ss>
        <Metadata error />
      </Theme>
    )
  ).toMatchImageSnapshot();
});

it('<Metadata addOpen />', async () => {
  expect(
    await screenshot(
      <Theme ss>
        <Metadata addOpen />
      </Theme>
    )
  ).toMatchImageSnapshot();
});

it('<Metadata metadata />', async () => {
  const metadata = [
    {
      name: 'name1',
      value: 'value1',
      id: 'name1-value1'
    },
    {
      name: 'name2',
      value: 'value2',
      id: 'name2-value2',
      expanded: true
    },
    {
      name: 'name3',
      value: 'value3',
      id: 'name3-value3',
      expanded: true,
      removing: true
    }
  ];

  expect(
    await screenshot(
      <Theme ss>
        <Metadata metadata={metadata} />
      </Theme>
    )
  ).toMatchImageSnapshot();
});
