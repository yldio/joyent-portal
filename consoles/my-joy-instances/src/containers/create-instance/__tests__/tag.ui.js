import React from 'react';
import { toMatchImageSnapshot } from 'jest-image-snapshot';
import screenshot from 'react-screenshot-renderer';

import Theme from '@mocks/theme';
import { Tags } from '../tags';

expect.extend({
  toMatchImageSnapshot
});

it('<Tags />', async () => {
  expect(
    await screenshot(
      <Theme ss>
        <Tags />
      </Theme>
    )
  ).toMatchImageSnapshot();
});

it('<Tags expanded />', async () => {
  expect(
    await screenshot(
      <Theme ss>
        <Tags expanded />
      </Theme>
    )
  ).toMatchImageSnapshot();
});

it('<Tags metadata=[] />', async () => {
  const metadata = [
    { name: 'hello', value: 'world' },
    { name: 'hello2', value: 'world2' }
  ];

  expect(
    await screenshot(
      <Theme ss>
        <Tags metadata={metadata} />
      </Theme>
    )
  ).toMatchImageSnapshot();
});

it('<Tags metadata=[] expanded />', async () => {
  const metadata = [
    { name: 'hello', value: 'world' },
    { name: 'hello2', value: 'world2' }
  ];

  expect(
    await screenshot(
      <Theme ss>
        <Tags metadata={metadata} expanded />
      </Theme>
    )
  ).toMatchImageSnapshot();
});

it('<Tags addOpen expanded />', async () => {
  expect(
    await screenshot(
      <Theme ss>
        <Tags addOpen expanded />
      </Theme>
    )
  ).toMatchImageSnapshot();
});
