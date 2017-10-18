/**
 * @jest-environment jsdom
 */

import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { withNotFound } from '../';

it('renders <withNotFound /> without throwing', () => {
  const tree = renderer.create(<withNotFound />).toJSON();
  expect(tree).toMatchSnapshot();
});
