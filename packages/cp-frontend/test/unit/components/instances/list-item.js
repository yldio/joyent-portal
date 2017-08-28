/**
 * @jest-environment jsdom
 */

import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import InstanceCard from '@components/instances/list-item.js';
import { instance } from '../../mocks';

it('renders <InstanceCard /> without throwing', () => {
  const tree = renderer.create(<InstanceCard instance={instance} />).toJSON();
  expect(tree).toMatchSnapshot();
});
