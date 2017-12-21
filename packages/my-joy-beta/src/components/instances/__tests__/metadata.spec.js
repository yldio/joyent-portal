import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { AddForm, EditForm } from '../metadata';
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
