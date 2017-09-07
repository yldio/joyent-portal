/**
 * @jest-environment jsdom
 */

import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import { Store, files } from '../../mocks';

import { Files } from '@components/manifest';


it('renders <Files /> without throwing', () => {
  const tree = renderer
    .create(
      <Store>
        <Files
          files={files}
          id="test"
          name="test"
          value="test"
          onRemoveFile={() => {}}
          readOnly
        />
      </Store>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});