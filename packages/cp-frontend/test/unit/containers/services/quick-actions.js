/**
 * @jest-environment jsdom
 */

import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { ServicesQuickActions } from '@containers/services/quick-actions.js';
import { Router, Store, service } from '../../mocks';

it('renders <ServicesQuickActions /> without throwing', () => {
  const tree = renderer
    .create(
      <Store>
        <Router>
          <ServicesQuickActions
            servicesQuickActions={{
              show: true,
              position: {},
              service
            }}
          />
        </Router>
      </Store>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
