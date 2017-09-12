/**
 * @jest-environment jsdom
 */

import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import PackagesHOC from '../';
import { Router, Store } from '@mocks/';

it('renders <PackagesHOC /> without throwing', () => {
  const tree = renderer
    .create(
      <Router>
        <Store>
          <PackagesHOC />
        </Store>
      </Router>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
