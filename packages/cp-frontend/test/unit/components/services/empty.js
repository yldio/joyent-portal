/**
 * @jest-environment jsdom
 */

import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import EmptyServices from '@components/services/empty.js';
import { Router } from '../../mocks';

it('renders <EmptyServices /> without throwing', () => {
  const tree = renderer
    .create(
      <Router>
        <EmptyServices />
      </Router>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
