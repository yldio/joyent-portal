/**
 * @jest-environment jsdom
 */

import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import HomeHOC from '../';
import { Router, Store } from '@mocks/';

it('renders <HomeHOC /> without throwing', () => {
  const tree = renderer
    .create(
      <Router>
        <Store>
          <HomeHOC />
        </Store>
      </Router>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
