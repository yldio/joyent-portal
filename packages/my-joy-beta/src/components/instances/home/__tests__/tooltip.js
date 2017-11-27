import React from 'react';
import renderer from 'react-test-renderer';
import Store from '@mocks/store';
import 'jest-styled-components';

import Tooltip from '../tooltip';

it('renders <Tooltip /> without throwing', () => {
  const tree = renderer
    .create(
      <Store>
        <Tooltip text="test"  />
      </Store>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
