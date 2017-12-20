import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import Breadcrumb, { Item } from '../';
import theme from '../../theme/';
import { ThemeProvider } from 'styled-components';

describe('Breadcrumb', () => {
  test('Default Breadcrumb', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={theme}>
          <Breadcrumb>
            <Item>Home</Item>
            <Item>Warp Records Blog</Item>
            <Item>Services</Item>
            <Item>Nginx</Item>
          </Breadcrumb>
        </ThemeProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Default Item', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={theme}>
          <Item>Home</Item>
        </ThemeProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
