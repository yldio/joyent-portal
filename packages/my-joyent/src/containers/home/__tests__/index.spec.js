/**
 * @jest-environment jsdom
 */

import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import HomeHOC from '../';
import { Router } from '@mocks/';

it('renders <HomeHOC /> without throwing', () => {
  const tree = renderer
    .create(
      <Router>
        <HomeHOC />
      </Router>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
