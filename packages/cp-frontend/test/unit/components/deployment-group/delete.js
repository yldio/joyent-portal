/**
 * @jest-environment jsdom
 */

import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import DeploymentGroupDelete from '@components/deployment-group/delete.js';
import { deploymentGroup } from '../../mocks';

it('renders <DeploymentGroupDelete /> without throwing', () => {
  const tree = renderer
    .create(<DeploymentGroupDelete deploymentGroup={deploymentGroup} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
