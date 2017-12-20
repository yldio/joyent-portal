import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import { PageContainer, ViewContainer } from '../';
import theme from '../../theme/';
import { ThemeProvider } from 'styled-components';
import remcalc from 'remcalc';

describe('Layout', () => {
  test('PageContainer', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={theme}>
          <PageContainer />
        </ThemeProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
    expect(tree).toHaveStyleRule('display', 'flex');
    expect(tree).toHaveStyleRule('flex-flow', 'column');
    expect(tree).toHaveStyleRule('flex', '1 1 auto');
  });

  test('ViewContainer', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={theme}>
          <ViewContainer />
        </ThemeProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
    expect(tree).toHaveStyleRule('max-width', remcalc(1000));
  });

  test('ViewContainer fluid', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={theme}>
          <ViewContainer fluid />
        </ThemeProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
    expect(tree).toHaveStyleRule('padding-left', '0');
    expect(tree).toHaveStyleRule('padding-right', '0');
  });

  test('ViewContainer main', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={theme}>
          <ViewContainer main />
        </ThemeProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
    expect(tree).toHaveStyleRule('padding-bottom', remcalc(18));
  });

  test('ViewContainer center', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={theme}>
          <ViewContainer center />
        </ThemeProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
    expect(tree).toHaveStyleRule('display', 'flex');
    expect(tree).toHaveStyleRule('flex-direction', 'column');
    expect(tree).toHaveStyleRule('justify-content', 'center');
    expect(tree).toHaveStyleRule('align-content', 'center');
    expect(tree).toHaveStyleRule('align-items', 'center');
  });
});
