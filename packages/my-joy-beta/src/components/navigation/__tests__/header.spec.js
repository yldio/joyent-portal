import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import Theme from '@mocks/theme';
import Router from '@mocks/router';

import Header from '../header';

it('renders <Header /> without throwing', () => {
  const tree = renderer
    .create(
      <Router>
        <Theme>
          <Header />
        </Theme>
      </Router>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
