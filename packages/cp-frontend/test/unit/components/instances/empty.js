/**
 * @jest-environment jsdom
 */

import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import EmtpyInstances from '@components/instances/empty.js';

it('renders <EmtpyInstances /> without throwing', () => {
  const tree = renderer.create(<EmtpyInstances />).toJSON();
  expect(tree).toMatchSnapshot();
});
