import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import Button from '../';
import theme from '../../theme/';
import { ThemeProvider } from 'styled-components';

describe('Button', () => {
  test('Default Button', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={theme}>
          <Button href="https://joyent.com">Inspire the lazy</Button>
        </ThemeProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
    expect(tree).toHaveStyleRule('color', theme.white.replace(/ /g, ''));
    expect(tree).toHaveStyleRule(
      'background-color',
      theme.primary.replace(/ /g, '')
    );
  });

  test('Secondary Button', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={theme}>
          <Button secondary href="https://joyent.com">
            Inspire the lazy
          </Button>
        </ThemeProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
    expect(tree).toHaveStyleRule('color', theme.secondary.replace(/ /g, ''));
    expect(tree).toHaveStyleRule(
      'background-color',
      theme.white.replace(/ /g, '')
    );
  });

  test('Error Button', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={theme}>
          <Button error href="https://joyent.com">
            Inspire the lazy
          </Button>
        </ThemeProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
    expect(tree).toHaveStyleRule('color', theme.red.replace(/ /g, ''));
    expect(tree).toHaveStyleRule('border-color', theme.red.replace(/ /g, ''));
  });

  test('Disabled Button', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={theme}>
          <Button disabled href="https://joyent.com">
            Inspire the lazy
          </Button>
        </ThemeProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
    expect(tree).toHaveStyleRule('color', theme.grey.replace(/ /g, ''));
    expect(tree).toHaveStyleRule(
      'background-color',
      theme.disabled.replace(/ /g, '')
    );
  });

  test('Loading Button', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={theme}>
          <Button disabled href="https://joyent.com">
            Inspire the lazy
          </Button>
        </ThemeProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
    expect(tree).toHaveStyleRule('color', theme.grey.replace(/ /g, ''));
    expect(tree).toHaveStyleRule(
      'background-color',
      theme.disabled.replace(/ /g, '')
    );
  });
});
