import React from 'react';
import { toMatchImageSnapshot } from 'jest-image-snapshot';
import screenshot from 'react-screenshot-renderer';

import Theme from '@mocks/theme';
import { Metadata } from '../metadata';

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

it('<Metadata expanded />', async () => {
  expect(
    await screenshot(
      <Theme ss>
        <Metadata expanded />
      </Theme>
    )
  ).toMatchImageSnapshot();
});

it('<Metadata metadata=[] />', async () => {
  const metadata = [
    { name: 'hello', value: 'world' },
    { name: 'hello2', value: 'world2' }
  ];

  expect(
    await screenshot(
      <Theme ss>
        <Metadata metadata={metadata} />
      </Theme>
    )
  ).toMatchImageSnapshot();
});

it('<Metadata metadata=[] expanded />', async () => {
  const metadata = [
    { name: 'hello', value: 'world' },
    { name: 'hello2', value: 'world2' }
  ];

  expect(
    await screenshot(
      <Theme ss>
        <Metadata metadata={metadata} expanded />
      </Theme>
    )
  ).toMatchImageSnapshot();
});

it('<Metadata addOpen expanded />', async () => {
  expect(
    await screenshot(
      <Theme ss>
        <Metadata addOpen expanded />
      </Theme>
    )
  ).toMatchImageSnapshot();
});
