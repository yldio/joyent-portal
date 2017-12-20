import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import Divider from '../';
import theme from '../../theme/';
import { ThemeProvider } from 'styled-components';

describe('Divider', () => {
  test('Default Divider', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={theme}>
          <Divider />
        </ThemeProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
    expect(tree).toHaveStyleRule(
      'background-color',
      theme.grey.replace(/ /g, '')
    );
  });

  test('Transparent Divider', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={theme}>
          <Divider transparent />
        </ThemeProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
    expect(tree).toHaveStyleRule('background-color', 'transparent');
  });
});
