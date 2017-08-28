/**
 * @jest-environment jsdom
 */

import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { InstanceList } from '@containers/instances/list.js';
import { Router, Store, instances } from '../../mocks';

xit('renders <InstanceList /> without throwing', () => {
  const tree = renderer
    .create(
      <Store>
        <Router>
          <InstanceList instances={instances} />
        </Router>
      </Store>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
