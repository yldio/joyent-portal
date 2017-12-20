import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import Table, { Thead, Tfoot, Tr, Th, Tbody, Td } from '../';
import theme from '../../theme/';
import { ThemeProvider } from 'styled-components';
import remcalc from 'remcalc';

describe('Table', () => {
  test('Table', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={theme}>
          <Table />
        </ThemeProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
    expect(tree).toHaveStyleRule('width', '100%');
    expect(tree).toHaveStyleRule('border-collapse', 'separate');
    expect(tree).toHaveStyleRule('table-layout', 'fixed');
  });

  test('Tr', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={theme}>
          <Tr />
        </ThemeProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
    expect(tree).toHaveStyleRule(
      'background-color',
      theme.white.replace(/ /g, '')
    );
    expect(tree).toHaveStyleRule('color', theme.text.replace(/ /g, ''));
  });

  test('Td', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={theme}>
          <Td />
        </ThemeProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
    expect(tree).toHaveStyleRule('border-color', theme.grey.replace(/ /g, ''));
  });

  test('Tbody', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={theme}>
          <Tbody />
        </ThemeProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
    expect(tree).toHaveStyleRule('width', '100%');
  });

  test('Tbody disabled', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={theme}>
          <Tbody disabled />
        </ThemeProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
    expect(tree).toHaveStyleRule('border-color', theme.grey.replace(/ /g, ''));
  });

  test('Th', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={theme}>
          <Th />
        </ThemeProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
    expect(tree).toHaveStyleRule('border-color', theme.grey.replace(/ /g, ''));
    expect(tree).toHaveStyleRule('color', theme.greyLight.replace(/ /g, ''));
  });

  test('Thead', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={theme}>
          <Thead />
        </ThemeProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
    expect(tree).toHaveStyleRule('width', '100%');
    expect(tree).toHaveStyleRule(
      'background',
      theme.background.replace(/ /g, '')
    );
  });

  test('Tfoot', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={theme}>
          <Tfoot />
        </ThemeProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
    expect(tree).toHaveStyleRule('width', '100%');
    expect(tree).toHaveStyleRule(
      'background',
      theme.background.replace(/ /g, '')
    );
  });
});
