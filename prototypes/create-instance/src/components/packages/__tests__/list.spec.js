/**
 * @jest-environment jsdom
 */

import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { Router, PackagesMock, FiltersMock } from '@mocks/';
import { Packages } from '../';

it('renders <Packages /> without throwing', () => {
  const tree = renderer
    .create(
      <Router>
        <Packages packages={PackagesMock} filters={FiltersMock} />
      </Router>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
