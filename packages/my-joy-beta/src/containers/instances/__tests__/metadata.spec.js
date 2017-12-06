import React from 'react';
import renderer from 'react-test-renderer';
import Store from '@mocks/store';
import 'jest-styled-components';

import Metadata from '../metadata';

it('renders <Metadata /> without throwing', () => {
  const tree = renderer
    .create(
      <Store>
        <Metadata />
      </Store>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
