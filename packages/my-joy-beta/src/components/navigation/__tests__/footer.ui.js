import React from 'react';
import { toMatchImageSnapshot } from 'jest-image-snapshot';
import screenshot from 'react-screenshot-renderer';

import Footer from '../footer';
import Theme from '@mocks/theme';

expect.extend({
  toMatchImageSnapshot
});

it('<Footer/>', async () => {
  expect(
    await screenshot(
      <Theme ss>
        <Footer />
      </Theme>
    )
  ).toMatchImageSnapshot();
});
