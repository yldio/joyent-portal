/**
 * @jest-environment jsdom
 */

import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { Router, FiltersMock, PackagesMock, Store } from '@mocks/';
import Filters from '../filters';

it('renders <Filters /> without throwing', () => {
  const tree = renderer
    .create(
      <Store>
        <Router>
          <Filters filters={FiltersMock} packages={PackagesMock} />
        </Router>
      </Store>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});