/**
 * @jest-environment jsdom
 */

import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { Router } from '@mocks/';
import { Header } from '../';

it('renders <Header /> without throwing', () => {
  const tree = renderer
    .create(
      <Router>
        <Header />
      </Router>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
