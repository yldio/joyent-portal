import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import Tag, { AddForm, EditForm } from '../tags';
import Theme from '@mocks/theme';

it('renders <AddForm /> without throwing', () => {
  expect(
    renderer
      .create(
        <Theme>
          <AddForm />
        </Theme>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <EditForm /> without throwing', () => {
  expect(
    renderer
      .create(
        <Theme>
          <EditForm />
        </Theme>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Tag /> without throwing', () => {
  expect(
    renderer
      .create(
        <Theme>
          <Tag />
        </Theme>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Tag name value/> without throwing', () => {
  expect(
    renderer
      .create(
        <Theme>
          <Tag name="name" value="value" />
        </Theme>
      )
      .toJSON()
  ).toMatchSnapshot();
});
