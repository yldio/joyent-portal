/**
 * @jest-environment jsdom
 */

import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import Loader from '@components/messaging/loader';

it('renders <Loader /> without throwing', () => {
  const tree = renderer
    .create(
      <Loader />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
