import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import Footer from '../';
import Theme from '@mocks/theme';

it('renders <Footer/> without throwing', () => {
  expect(
    renderer
      .create(
        <Theme>
          <Footer />
        </Theme>
      )
      .toJSON()
  ).toMatchSnapshot();
});
