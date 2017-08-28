/**
 * @jest-environment jsdom
 */

import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { ServiceDelete } from '@containers/service/delete.js';
import { Router, Store, service } from '../../mocks';

it('renders <ServiceDelete /> without throwing', () => {
  const tree = renderer
    .create(
      <Store>
        <Router>
          <ServiceDelete service={service} />
        </Router>
      </Store>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
