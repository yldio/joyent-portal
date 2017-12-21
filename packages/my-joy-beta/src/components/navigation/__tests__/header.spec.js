import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import Header from '../header';
import Theme from '@mocks/theme';

it('renders <Header /> without throwing', () => {
  expect(
    renderer
      .create(
        <Theme>
          <Header />
        </Theme>
      )
      .toJSON()
  ).toMatchSnapshot();
});
