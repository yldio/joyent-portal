
/**
 * @jest-environment jsdom
 */

import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import NotFoundHoc from '@containers/navigation/not-found-hoc.js';
import { Router, Store } from '../../mocks';

xit('renders <NotFoundHoc /> without throwing', () => {
  const tree = renderer
    .create(
      <Store>
        <Router>
          <NotFoundHoc />
        </Router>
      </Store>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
