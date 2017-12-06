import React from 'react';
import renderer from 'react-test-renderer';
import Store from '@mocks/store';
import 'jest-styled-components';

import Tags from '../tags';


it('renders <Tags /> without throwing', () => {
  const tree = renderer
    .create(
      <Store>
        <Tags />
      </Store>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});