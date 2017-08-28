/**
 * @jest-environment jsdom
 */

import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import { service } from '../../mocks';

import Delete from '@components/service/delete';

it('renders <Delete /> without throwing', () => {
  const tree = renderer.create(<Delete service={service} />).toJSON();
  expect(tree).toMatchSnapshot();
});
