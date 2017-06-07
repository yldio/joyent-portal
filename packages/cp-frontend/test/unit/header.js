/**
 * @jest-environment node
 */

// import 'jest-styled-components';

import React from 'react';
import renderer from 'react-test-renderer';
import Header from '@components/navigation/header';
import { Router } from './mocks';

it('renders <Header /> without throwing', () => {
  const tree = renderer.create(<Router><Header /></Router>).toJSON();
  expect(tree).toMatchSnapshot();
});
