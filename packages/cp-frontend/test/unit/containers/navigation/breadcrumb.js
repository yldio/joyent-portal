/**
 * @jest-environment jsdom
 */

import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { Breadcrumb } from '@containers/navigation/breadcrumb.js';
import { Router, Store } from '../../mocks';

it('renders <Breadcrumb /> without throwing', () => {
  const props = {
    location: {
      pathname: ''
    }
  };
  const tree = renderer
    .create(
      <Store>
        <Router>
          <Breadcrumb {...props} />
        </Router>
      </Store>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
