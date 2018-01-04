import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import StatusLoader from '../';
import { Theme } from '../../mocks';

describe('StatusLoader', () => {
  test('StatusLoader', () => {
    const tree = renderer
      .create(
        <Theme>
          <StatusLoader />
        </Theme>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
