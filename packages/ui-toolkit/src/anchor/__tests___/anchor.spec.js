import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import Anchor from '../';
import theme from '../../theme/';
import { ThemeProvider } from 'styled-components';

describe('Anchor', () => {
  test('Default Anchor', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={theme}>
          <Anchor href="https://joyent.com">Inspire the lazy</Anchor>
        </ThemeProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
    expect(tree).toHaveStyleRule('color', theme.primary.replace(/ /g, ''));
  });

  test('Reversed Anchor', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={theme}>
          <Anchor reversed href="https://joyent.com">
            Inspire the lazy
          </Anchor>
        </ThemeProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
    expect(tree).toHaveStyleRule('color', theme.white.replace(/ /g, ''));
  });

  test('Disabled Anchor', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={theme}>
          <Anchor disabled href="https://joyent.com">
            Inspire the lazy
          </Anchor>
        </ThemeProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
    expect(tree).toHaveStyleRule('color', theme.grey.replace(/ /g, ''));
  });
});
