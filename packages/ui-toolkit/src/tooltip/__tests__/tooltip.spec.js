import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import Tooltip, { Container, Target } from '../';
import theme from '../../theme/';
import { ThemeProvider } from 'styled-components';

describe('Tooltip', () => {
  test('Tooltip', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={theme}>
          <Container>
            <Target>Hello</Target>
            <Tooltip placement="top">
              <code>top</code>
            </Tooltip>
          </Container>
        </ThemeProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
