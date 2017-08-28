/**
 * @jest-environment jsdom
 */

import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { Menu } from '@containers/navigation/menu.js';
import { Router, Store } from '../../mocks';

it('renders <Menu /> without throwing', () => {
  const tree = renderer
    .create(
      <Store>
        <Router>
          <Menu />
        </Router>
      </Store>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
