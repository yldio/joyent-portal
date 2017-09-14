/**
 * @jest-environment jsdom
 */

import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { Router, FiltersMock } from '@mocks/';
import Filters from '../filters';

it('renders <Filters /> without throwing', () => {
  const tree = renderer
    .create(
      <Router>
        <Filters filters={FiltersMock} />
      </Router>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
