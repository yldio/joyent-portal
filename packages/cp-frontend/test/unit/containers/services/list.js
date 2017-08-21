
/**
 * @jest-environment jsdom
 */

import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { ServiceList } from '@containers/services/list.js';
import { Router, Store, deploymentGroup, services } from '../../mocks';

it('renders <ServiceList /> without throwing', () => {
  const tree = renderer
    .create(
      <Store>
        <Router>
          <ServiceList
            deploymentGroup={deploymentGroup}
            services={services}
          />
        </Router>
      </Store>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
