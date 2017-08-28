/**
 * @jest-environment jsdom
 */

import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import MEditor from '@components/manifest/edit-or-create.js';
import { Router } from '../../mocks';

xit('renders <MEditor /> without throwing', () => {
  const tree = renderer
    .create(
      <Router>
        <MEditor />
      </Router>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
