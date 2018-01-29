import React from 'react';
import { toMatchImageSnapshot } from 'jest-image-snapshot';
import screenshot from 'react-screenshot-renderer';

import { AddForm, EditForm } from '../metadata';
import Theme from '@mocks/theme';

expect.extend({
  toMatchImageSnapshot
});

it('<AddForm />', async () => {
  expect(
    await screenshot(
      <Theme ss>
        <AddForm />
      </Theme>
    )
  ).toMatchImageSnapshot();
});

it('<EditForm />', async () => {
  expect(
    await screenshot(
      <Theme ss>
        <EditForm />
      </Theme>
    )
  ).toMatchImageSnapshot();
});
