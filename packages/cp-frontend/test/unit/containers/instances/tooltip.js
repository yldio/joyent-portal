/**
 * @jest-environment jsdom
 */

import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { InstancesTooltip } from '@containers/instances/tooltip.js';
import { Router, Store, instance } from '../../mocks';

it('renders <InstancesTooltip /> without throwing', () => {
  const tree = renderer
    .create(
      <Store>
        <Router>
          <InstancesTooltip
            instancesTooltip={{
              show: true,
              position: {},
              type: 'healthy',
              instance
            }}
          />
        </Router>
      </Store>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
