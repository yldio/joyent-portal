
/**
 * @jest-environment jsdom
 */

import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { DeploymentGroupDelete } from '@containers/deployment-group/delete';
import { Router, Store, deploymentGroup } from '../../mocks';

it('renders <DeploymentGroupDelete /> without throwing', () => {
  const tree = renderer
    .create(
      <Store>
        <Router>
          <DeploymentGroupDelete
            deploymentGroup={deploymentGroup}
            deleteDeploymentGroup={() => {}}
          />
        </Router>
      </Store>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
