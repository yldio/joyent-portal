
/**
 * @jest-environment jsdom
 */

import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { ServiceScale } from '@containers/service/scale';
import { Router, Store, service } from '../../mocks';

it('renders <ServiceScale /> without throwing', () => {
  const tree = renderer
    .create(
      <Store>
        <Router>
          <ServiceScale service={service} />
        </Router>
      </Store>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
