import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import StatusLoader from '../';
import theme from '../../theme/';
import { ThemeProvider } from 'styled-components';

describe('StatusLoader', () => {
  test('StatusLoader', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={theme}>
          <StatusLoader />
        </ThemeProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
