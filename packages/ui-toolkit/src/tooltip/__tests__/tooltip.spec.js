import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import Tooltip, { Container, Target } from '../';
import { Theme } from '../../mocks';

describe('Tooltip', () => {
  test('Tooltip', () => {
    const tree = renderer
      .create(
        <Theme>
          <Container>
            <Target>Hello</Target>
            <Tooltip placement="top">
              <code>top</code>
            </Tooltip>
          </Container>
        </Theme>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
