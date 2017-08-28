/**
 * @jest-environment jsdom
 */

import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { DeploymentGroupList } from '@containers/deployment-groups/list.js';
import { Router, Store, deploymentGroups } from '../../mocks';

it('renders <DeploymentGroupList /> without throwing', () => {
  const tree = renderer
    .create(
      <Store>
        <Router>
          <DeploymentGroupList
            deploymentGroups={deploymentGroups}
            match={{ path: '' }}
          />
        </Router>
      </Store>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
