
/**
 * @jest-environment jsdom
 */

import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { ServicesMenu } from '@containers/services/menu.js';
import { Router, Store } from '../../mocks';

it('renders <ServicesMenu /> without throwing', () => {
  const props = {
    location: {
      pathname: ''
    },
    history: {
      push: () => {}
    }
  }
  const tree = renderer
    .create(
      <Store>
        <Router>
          <ServicesMenu { ...props } />
        </Router>
      </Store>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
