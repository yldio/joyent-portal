import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import Theme from '@mocks/theme';
import Router from '@mocks/router';
import Store from '@mocks/store';

import Breadcrumb from '../breadcrumb';

it('renders <Breadcrumb /> without throwing', () => {
  const tree = renderer
    .create(
      <Store>
        <Router>
          <Theme>
            <Breadcrumb />
          </Theme>
        </Router>
      </Store>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
