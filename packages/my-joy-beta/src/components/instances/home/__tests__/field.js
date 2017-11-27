import React from 'react';
import renderer from 'react-test-renderer';
import Store from '@mocks/store';
import 'jest-styled-components';

import Field from '../field';

it('renders <Field /> without throwing', () => {
  const tree = renderer
    .create(
      <Store>
        <Field label="test" text="test" />
      </Store>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
