/**
 * @jest-environment jsdom
 */

import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import Warning from '@components/messaging/warning';

it('renders <Warning /> without throwing', () => {
  const tree = renderer
    .create(
      <Warning message='Warning message'/>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
