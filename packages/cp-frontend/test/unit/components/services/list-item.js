
/**
 * @jest-environment jsdom
 */

import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import ServiceListItem from '@components/services/list-item.js';
import { Router, service } from '../../mocks';

it('renders <ServiceListItem /> without throwing', () => {
  const tree = renderer
    .create(
      <Router>
        <ServiceListItem service={service} />
      </Router>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders child <ServiceListItem /> without throwing', () => {
  const tree = renderer
    .create(
      <ServiceListItem service={service} isChild />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
