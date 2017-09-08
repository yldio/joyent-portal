/**
 * @jest-environment jsdom
 */

import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { Router } from '@mocks/';
import Home from '../home';

it('renders <Home /> without throwing', () => {
  const tree = renderer
    .create(
      <Router>
        <Home />
      </Router>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
