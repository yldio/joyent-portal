
/**
 * @jest-environment jsdom
 */

import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import DeploymentGroupImport from '@containers/deployment-groups/import.js';
import { Router, Store } from '../../mocks';

it('renders <DeploymentGroupImport /> without throwing', () => {
  const tree = renderer
    .create(
      <Store>
        <Router>
          <DeploymentGroupImport />
        </Router>
      </Store>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
