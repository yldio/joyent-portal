import React from 'react';
import { toMatchImageSnapshot } from 'jest-image-snapshot';
import screenshot from 'react-screenshot-renderer';

import { Toolbar } from '../toolbar';
import Theme from '@mocks/theme';

expect.extend({
  toMatchImageSnapshot
});

it('<Toolbar />', async () => {
  expect(
    await screenshot(
      <Theme ss>
        <Toolbar />
      </Theme>
    )
  ).toMatchImageSnapshot();
});

it('<Toolbar searchLabel />', async () => {
  expect(
    await screenshot(
      <Theme ss>
        <Toolbar searchLabel="Search label" />
      </Theme>
    )
  ).toMatchImageSnapshot();
});

it('<Toolbar searchPlaceholder />', async () => {
  expect(
    await screenshot(
      <Theme ss>
        <Toolbar searchPlaceholder="Search placeholder" />
      </Theme>
    )
  ).toMatchImageSnapshot();
});

it('<Toolbar searchable />', async () => {
  expect(
    await screenshot(
      <Theme ss>
        <Toolbar searchable={false} />
      </Theme>
    )
  ).toMatchImageSnapshot();
});

it('<Toolbar actionLabel />', async () => {
  expect(
    await screenshot(
      <Theme ss>
        <Toolbar actionLabel="Action label" />
      </Theme>
    )
  ).toMatchImageSnapshot();
});

it('<Toolbar actionable />', async () => {
  expect(
    await screenshot(
      <Theme ss>
        <Toolbar actionable={false} />
      </Theme>
    )
  ).toMatchImageSnapshot();
});

it('<Toolbar onActionClick />', async () => {
  expect(
    await screenshot(
      <Theme ss>
        <Toolbar onActionClick={() => null} />
      </Theme>
    )
  ).toMatchImageSnapshot();
});
