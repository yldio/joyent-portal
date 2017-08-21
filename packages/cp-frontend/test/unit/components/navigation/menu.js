/**
 * @jest-environment jsdom
 */

import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import Menu from '@components/navigation/menu';
import { Router } from '../../mocks';

it('renders <Menu /> without throwing', () => {
  const tree = renderer
    .create(
      <Router>
        <Menu />
      </Router>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
