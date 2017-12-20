import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import SectionList, { Item, Anchor } from '../';
import theme from '../../theme/';
import { ThemeProvider } from 'styled-components';
import remcalc from 'remcalc';

describe('SectionList', () => {
  test('SectionList', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={theme}>
          <SectionList>
            <Item>
              <Anchor active>Overview</Anchor>
            </Item>
            <Item>
              <Anchor>Services</Anchor>
            </Item>
            <Item>
              <Anchor>Instances</Anchor>
            </Item>
          </SectionList>
        </ThemeProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Item', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={theme}>
          <Item>
            <Anchor>Instances</Anchor>
          </Item>
        </ThemeProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
    expect(tree).toHaveStyleRule('font-size', remcalc(15));
  });

  test('Anchor', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={theme}>
          <Anchor>Instances</Anchor>
        </ThemeProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
    expect(tree).toHaveStyleRule('color', theme.secondary.replace(/ /g, ''));
  });

  test('Anchor', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={theme}>
          <Anchor active>Instances</Anchor>
        </ThemeProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
    expect(tree).toHaveStyleRule('color', theme.primary.replace(/ /g, ''));
  });
});
