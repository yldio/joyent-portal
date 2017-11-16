import React from 'react';
import renderer from 'react-test-renderer';
import Theme from '@mocks/theme';
import Router from '@mocks/router';
import 'jest-styled-components';

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
