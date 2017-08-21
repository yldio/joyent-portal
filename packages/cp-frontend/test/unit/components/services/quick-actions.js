
/**
 * @jest-environment jsdom
 */

import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import ServicesQuickActions from '@components/services/quick-actions.js';
import { Router, service } from '../../mocks';

it('renders <ServicesQuickActions /> without throwing', () => {
  const tree = renderer
    .create(
      <Router>
        <ServicesQuickActions service={service} />
      </Router>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
