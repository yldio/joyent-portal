/**
 * @jest-environment jsdom
 */

import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { SectionNav } from '../';
import { Router } from '@mocks/';

it('renders <SectionNav /> without throwing', () => {
  const tree = renderer
    .create(
      <Router>
        <SectionNav />
      </Router>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
