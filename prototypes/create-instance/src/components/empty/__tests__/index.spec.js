/**
 * @jest-environment jsdom
 */

import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { Router } from '@mocks/';
import Empty from '../';

it('renders <Package /> without throwing', () => {
  const tree = renderer
    .create(
      <Router>
        <Empty />
      </Router>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
