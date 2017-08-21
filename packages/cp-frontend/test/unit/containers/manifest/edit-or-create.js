
/**
 * @jest-environment jsdom
 */

import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import DeploymentGroupEditOrCreate from '@containers/manifest/edit-or-create.js';
import { Router, Store } from '../../mocks';

it('renders <DeploymentGroupEditOrCreate /> without throwing', () => {
  const tree = renderer
    .create(
      <Store>
        <Router>
          <DeploymentGroupEditOrCreate />
        </Router>
      </Store>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
