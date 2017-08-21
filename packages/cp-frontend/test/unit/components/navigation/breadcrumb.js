/**
 * @jest-environment jsdom
 */

import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import Breadcrumb from '@components/navigation/breadcrumb';
import { Router } from '../../mocks';

it('renders <Breadcrumb /> without throwing', () => {
  const tree = renderer
    .create(
      <Router>
        <Breadcrumb />
      </Router>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
