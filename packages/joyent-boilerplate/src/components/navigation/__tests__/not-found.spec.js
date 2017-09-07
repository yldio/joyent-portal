/**
 * @jest-environment jsdom
 */

import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import { Router } from '@mocks/';

import { NotFound } from '../';

it('renders <NotFound /> without throwing', () => {
  const tree = renderer.create(
        <Router>
            <NotFound />
        </Router>
    ).toJSON();
  expect(tree).toMatchSnapshot();
});
