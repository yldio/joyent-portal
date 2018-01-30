import React from 'react';
import { toMatchImageSnapshot } from 'jest-image-snapshot';
import renderer from 'react-test-renderer';
import screenshot from 'react-screenshot-renderer';

import Tag, { AddForm, EditForm } from '../tags';
import Theme from '@mocks/theme';

expect.extend({
  toMatchImageSnapshot
});

it('renders <AddForm /> without throwing', async () => {
  expect(
    await screenshot(
      <Theme ss>
        <AddForm />
      </Theme>
    )
  ).toMatchImageSnapshot();
});

it('renders <EditForm /> without throwing', async () => {
  expect(
    await screenshot(
      <Theme ss>
        <EditForm />
      </Theme>
    )
  ).toMatchImageSnapshot();
});

it('renders <Tag /> without throwing', async () => {
  expect(
    await screenshot(
      <Theme ss>
        <Tag />
      </Theme>
    )
  ).toMatchImageSnapshot();
});

it('renders <Tag name value/> without throwing', async () => {
  expect(
    await screenshot(
      <Theme ss>
        <Tag name="name" value="value" />
      </Theme>
    )
  ).toMatchImageSnapshot();
});
