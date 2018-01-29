import React from 'react';
import { toMatchImageSnapshot } from 'jest-image-snapshot';
import screenshot from 'react-screenshot-renderer';

import { Tags } from '../tags';
import Theme from '@mocks/theme';

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

it('<Tags loading />', async () => {
  expect(
    await screenshot(
      <Theme ss>
        <Tags loading />
      </Theme>
    )
  ).toMatchImageSnapshot();
});

it('<Tags error />', async () => {
  expect(
    await screenshot(
      <Theme ss>
        <Tags error />
      </Theme>
    )
  ).toMatchImageSnapshot();
});

it('<Tags addOpen />', async () => {
  expect(
    await screenshot(
      <Theme ss>
        <Tags addOpen />
      </Theme>
    )
  ).toMatchImageSnapshot();
});

it('<Tags editing />', async () => {
  const editing = {
    name: 'name1',
    value: 'value1',
    id: 'name1-value1',
    form: 'editing-form'
  };

  expect(
    await screenshot(
      <Theme ss>
        <Tags editing={editing} />
      </Theme>
    )
  ).toMatchImageSnapshot();
});

it('<Tags editable />', async () => {
  expect(
    await screenshot(
      <Theme ss>
        <Tags editable />
      </Theme>
    )
  ).toMatchImageSnapshot();
});

it('<Tags editing.removing />', async () => {
  const editing = {
    name: 'name1',
    value: 'value1',
    id: 'name1-value1',
    form: 'editing-form',
    removing: true
  };

  expect(
    await screenshot(
      <Theme ss>
        <Tags editing={editing} />
      </Theme>
    )
  ).toMatchImageSnapshot();
});

it('<Tags tags />', async () => {
  const tags = [
    {
      name: 'name1',
      value: 'value1',
      id: 'name1-value1'
    },
    {
      name: 'name2',
      value: 'value2',
      id: 'name2-value2'
    },
    {
      name: 'name3',
      value: 'value3',
      id: 'name3-value3'
    }
  ];

  expect(
    await screenshot(
      <Theme ss>
        <Tags tags={tags} />
      </Theme>
    )
  ).toMatchImageSnapshot();
});
