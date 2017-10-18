/**
 * @jest-environment jsdom
 */

import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { Router } from '@mocks/';
import Package from '../';

const pack = {
  disk: 200,
  group: 'Compute Optimized',
  memory: 7.8,
  name: 'High CPU 7.75',
  price: '0.263',
  vcpus: 4
};

it('renders <Package /> without throwing', () => {
  const tree = renderer
    .create(
      <Router>
        <Package pack={pack} />
      </Router>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
