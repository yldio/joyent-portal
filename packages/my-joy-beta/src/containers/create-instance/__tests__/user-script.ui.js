import React from 'react';
import { toMatchImageSnapshot } from 'jest-image-snapshot';
import renderer from 'react-test-renderer';
import screenshot from 'react-screenshot-renderer';

import Theme from '@mocks/theme';
import { UserScript } from '../user-script';

expect.extend({
  toMatchImageSnapshot
});

it('<UserScript />', async () => {
  expect(
    await screenshot(
      <Theme ss>
        <UserScript />
      </Theme>
    )
  ).toMatchImageSnapshot();
});

it('<UserScript proceeded />', async () => {
  expect(
    await screenshot(
      <Theme ss>
        <UserScript proceeded />
      </Theme>
    )
  ).toMatchImageSnapshot();
});

it('<UserScript expanded />', async () => {
  expect(
    await screenshot(
      <Theme ss>
        <UserScript expanded />
      </Theme>
    )
  ).toMatchImageSnapshot();
});

it('<UserScript expanded create />', async () => {
  expect(
    await screenshot(
      <Theme ss>
        <UserScript expanded create />
      </Theme>
    )
  ).toMatchImageSnapshot();
});

it('<UserScript expanded create formOpen />', async () => {
  expect(
    await screenshot(
      <Theme ss>
        <UserScript expanded create formOpen />
      </Theme>
    )
  ).toMatchImageSnapshot();
});

it('<UserScript expanded edit formOpen />', async () => {
  expect(
    await screenshot(
      <Theme ss>
        <UserScript expanded edit formOpen />
      </Theme>
    )
  ).toMatchImageSnapshot();
});

it('<UserScript expanded edit formOpen script />', async () => {
  expect(
    await screenshot(
      <Theme ss>
        <UserScript expanded edit formOpen script={{ value: 'hey' }} />
      </Theme>
    )
  ).toMatchImageSnapshot();
});
