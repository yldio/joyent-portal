import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import Name from '../name';
import Theme from '@mocks/theme';

it('renders <Name /> without throwing', () => {
  expect(
    renderer
      .create(
        <Theme>
          <Name />
        </Theme>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Name expanded /> without throwing', () => {
  expect(
    renderer
      .create(
        <Theme>
          <Name expanded />
        </Theme>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Name name="test" /> without throwing', () => {
  expect(
    renderer
      .create(
        <Theme>
          <Name name="test" />
        </Theme>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Name pristine={false} /> without throwing', () => {
  expect(
    renderer
      .create(
        <Theme>
          <Name pristine={false} />
        </Theme>
      )
      .toJSON()
  ).toMatchSnapshot();
});
