/**
 * @jest-environment jsdom
 */

import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import 'jest-styled-components';

import { Router, FiltersMock } from '@mocks/';
import Home from '../home';

it('renders <Home /> without throwing', () => {
  const renderer = new ShallowRenderer();
  renderer.render(
    <Router>
      <Home filters={FiltersMock} />
    </Router>
  );
  const tree = renderer.getRenderOutput();
  expect(tree).toMatchSnapshot();
});
