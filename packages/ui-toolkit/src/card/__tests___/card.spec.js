import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import Card, { Header } from '../';
import theme from '../../theme/';
import { ThemeProvider } from 'styled-components';

describe('Card', () => {
  test('Default Card', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={theme}>
          <Card>Inspire the lazy</Card>
        </ThemeProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
    expect(tree).toHaveStyleRule('border-color', theme.grey.replace(/ /g, ''));
    expect(tree).toHaveStyleRule(
      'background-color',
      theme.white.replace(/ /g, '')
    );
  });

  test('Disabled Card', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={theme}>
          <Card disabled>Inspire the lazy</Card>
        </ThemeProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
    expect(tree).toHaveStyleRule('border-color', theme.grey.replace(/ /g, ''));
    expect(tree).toHaveStyleRule(
      'background-color',
      theme.disabled.replace(/ /g, '')
    );
  });

  test('Secondary Card', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={theme}>
          <Card secondary>Inspire the lazy</Card>
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

  test('Shadow Card', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={theme}>
          <Card shadow>Inspire the lazy</Card>
        </ThemeProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
    expect(tree).toHaveStyleRule(
      'box-shadow',
      '0 0.125rem 0 0 rgba(0,0,0,0.05)'
    );
  });

  test('Card With Header', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={theme}>
          <Card>
            <Header>Inspire the lazy</Header>
          </Card>
        </ThemeProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
