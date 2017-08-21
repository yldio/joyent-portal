
/**
 * @jest-environment jsdom
 */

import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { Header } from '@containers/navigation/header.js';
import { Router, Store } from '../../mocks';

it('renders <Header /> without throwing', () => {
  const tree = renderer
    .create(
      <Store>
        <Router>
          <Header />
        </Router>
      </Store>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
