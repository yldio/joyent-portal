/**
 * @jest-environment jsdom
 */

import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { Router, Store } from '@mocks/';
import { default as DiskTypeForm } from '../';

it('renders <DiskTypeForm /> without throwing', () => {
  const tree = renderer
    .create(
      <Store>
        <Router>
          <DiskTypeForm />
        </Router>
      </Store>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
