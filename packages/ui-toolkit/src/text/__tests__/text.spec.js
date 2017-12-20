import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import { P, H1, H2, H3, H4, H5, H6, Small } from '../';
import remcalc from 'remcalc';
import theme from '../../theme/';
import { ThemeProvider } from 'styled-components';

describe('Button', () => {
  test('Paragraph', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={theme}>
          <P>Inspire the lazy</P>
        </ThemeProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
    expect(tree).toHaveStyleRule('color', theme.text.replace(/ /g, ''));
    expect(tree).toHaveStyleRule('font-size', remcalc(15));
  });

  test('Small', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={theme}>
          <Small>Inspire the lazy</Small>
        </ThemeProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
    expect(tree).toHaveStyleRule('color', theme.text.replace(/ /g, ''));
    expect(tree).toHaveStyleRule('font-size', remcalc(13));
  });

  test('H1', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={theme}>
          <H1>Inspire the lazy</H1>
        </ThemeProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
    expect(tree).toHaveStyleRule('color', theme.text.replace(/ /g, ''));
    expect(tree).toHaveStyleRule('font-size', remcalc(36));
  });

  test('H2', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={theme}>
          <H2>Inspire the lazy</H2>
        </ThemeProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
    expect(tree).toHaveStyleRule('color', theme.text.replace(/ /g, ''));
    expect(tree).toHaveStyleRule('font-size', remcalc(24));
  });

  test('H3', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={theme}>
          <H3>Inspire the lazy</H3>
        </ThemeProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
    expect(tree).toHaveStyleRule('color', theme.text.replace(/ /g, ''));
    expect(tree).toHaveStyleRule('font-size', remcalc(21));
  });

  test('H4', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={theme}>
          <H4>Inspire the lazy</H4>
        </ThemeProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
    expect(tree).toHaveStyleRule('color', theme.text.replace(/ /g, ''));
    expect(tree).toHaveStyleRule('font-size', remcalc(15));
    expect(tree).toHaveStyleRule(
      'font-weight',
      `${theme.font.weight.semibold}`
    );
  });

  test('H5', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={theme}>
          <H5>Inspire the lazy</H5>
        </ThemeProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
    expect(tree).toHaveStyleRule('color', theme.text.replace(/ /g, ''));
    expect(tree).toHaveStyleRule('font-size', remcalc(15));
  });

  test('H6', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={theme}>
          <H6>Inspire the lazy</H6>
        </ThemeProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
    expect(tree).toHaveStyleRule('color', theme.text.replace(/ /g, ''));
    expect(tree).toHaveStyleRule('font-size', remcalc(13));
  });
});
