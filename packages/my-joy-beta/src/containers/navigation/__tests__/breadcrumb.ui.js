import React from 'react';
import { toMatchImageSnapshot } from 'jest-image-snapshot';
import renderer from 'react-test-renderer';
import screenshot from 'react-screenshot-renderer';

import Breadcrumb from '../breadcrumb';
import Theme from '@mocks/theme';

expect.extend({
  toMatchImageSnapshot
});

it('<Breadcrumb />', async () => {
  expect(
    await screenshot(
      <Theme ss>
        <Breadcrumb />
      </Theme>
    )
  ).toMatchImageSnapshot();
});

it('<Breadcrumb match />', async () => {
  const match = {
    params: {
      instance: 'name'
    }
  };

  expect(
    await screenshot(
      <Theme ss>
        <Breadcrumb match={match} />
      </Theme>
    )
  ).toMatchImageSnapshot();
});
