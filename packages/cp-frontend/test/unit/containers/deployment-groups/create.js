/**
 * @jest-environment jsdom
 */

import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import DeploymentGroupCreate from '@containers/deployment-groups/create.js';
import { Router, Store } from '../../mocks';

it('renders <DeploymentGroupCreate /> without throwing', () => {
  const props = {
    match: {
      params: {
        stage: ''
      }
    }
  };
  const tree = renderer
    .create(
      <Store>
        <Router>
          <DeploymentGroupCreate {...props} />
        </Router>
      </Store>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
