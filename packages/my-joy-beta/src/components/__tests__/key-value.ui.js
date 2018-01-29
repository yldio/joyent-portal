import React from 'react';
import { toMatchImageSnapshot } from 'jest-image-snapshot';
import screenshot from 'react-screenshot-renderer';

import { KeyValue } from '../key-value';
import Theme from '@mocks/theme';

expect.extend({
  toMatchImageSnapshot
});

it('<KeyValue />', async () => {
  expect(
    await screenshot(
      <Theme ss>
        <KeyValue />
      </Theme>
    )
  ).toMatchImageSnapshot();
});

it('<KeyValue expanded={false} />', async () => {
  expect(
    await screenshot(
      <Theme ss>
        <KeyValue expanded={false} />
      </Theme>
    )
  ).toMatchImageSnapshot();
});

it('<KeyValue input="input" />', async () => {
  expect(
    await screenshot(
      <Theme ss>
        <KeyValue input="input" />
      </Theme>
    )
  ).toMatchImageSnapshot();
});

it('<KeyValue input="textarea" />', async () => {
  expect(
    await screenshot(
      <Theme ss>
        <KeyValue input="textarea" />
      </Theme>
    )
  ).toMatchImageSnapshot();
});

it('<KeyValue type="tag" />', async () => {
  expect(
    await screenshot(
      <Theme ss>
        <KeyValue type="tag" />
      </Theme>
    )
  ).toMatchImageSnapshot();
});

it('<KeyValue method="add" />', async () => {
  expect(
    await screenshot(
      <Theme ss>
        <KeyValue method="add" />
      </Theme>
    )
  ).toMatchImageSnapshot();
});

it('<KeyValue method="edit" />', async () => {
  expect(
    await screenshot(
      <Theme ss>
        <KeyValue method="edit" />
      </Theme>
    )
  ).toMatchImageSnapshot();
});

it('<KeyValue removing />', async () => {
  expect(
    await screenshot(
      <Theme ss>
        <KeyValue removing />
      </Theme>
    )
  ).toMatchImageSnapshot();
});

it('<KeyValue submitting />', async () => {
  expect(
    await screenshot(
      <Theme ss>
        <KeyValue submitting />
      </Theme>
    )
  ).toMatchImageSnapshot();
});
