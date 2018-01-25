import React from 'react';
import { toMatchImageSnapshot } from 'jest-image-snapshot';
import renderer from 'react-test-renderer';
import screenshot from 'react-screenshot-renderer';

import Name from '../name';
import Theme from '@mocks/theme';

expect.extend({
  toMatchImageSnapshot
});

it('<Name />', async () => {
  expect(
    await screenshot(
      <Theme ss>
        <Name />
      </Theme>
    )
  ).toMatchImageSnapshot();
});

it('<Name expanded />', async () => {
  expect(
    await screenshot(
      <Theme ss>
        <Name expanded />
      </Theme>
    )
  ).toMatchImageSnapshot();
});

it('<Name name="test" />', async () => {
  expect(
    await screenshot(
      <Theme ss>
        <Name name="test" />
      </Theme>
    )
  ).toMatchImageSnapshot();
});

it('<Name pristine={false} />', async () => {
  expect(
    await screenshot(
      <Theme ss>
        <Name pristine={false} />
      </Theme>
    )
  ).toMatchImageSnapshot();
});
