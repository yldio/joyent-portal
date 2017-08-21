/**
 * @jest-environment jsdom
 */

import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import NotFound from '@components/navigation/not-found';
import { Router } from '../../mocks';

it('renders <NotFound /> without throwing', () => {
  const tree = renderer
    .create(
      <Router>
        <NotFound />
      </Router>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
