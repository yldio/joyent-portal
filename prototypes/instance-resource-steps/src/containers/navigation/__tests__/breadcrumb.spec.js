import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import Breadcrumb from '../breadcrumb';
import Theme from '@mocks/theme';

it('renders <Breadcrumb /> without throwing', () => {
  expect(
    renderer
      .create(
        <Theme>
          <Breadcrumb />
        </Theme>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Breadcrumb match /> without throwing', () => {
  const match = {
    params: {
      resource: 'name'
    }
  };

  expect(
    renderer
      .create(
        <Theme>
          <Breadcrumb match={match} />
        </Theme>
      )
      .toJSON()
  ).toMatchSnapshot();
});
