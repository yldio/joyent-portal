/**
 * @jest-environment jsdom
 */

import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { ServicesTopology } from '@containers/services/topology.js';
import { Router, Store, services } from '../../mocks';

it('renders <ServicesTopology /> without throwing', () => {
  const tree = renderer
    .create(
      <Store>
        <Router>
          <ServicesTopology services={services} />
        </Router>
      </Store>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});