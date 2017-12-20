import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import Popover, { Container, Target, Item, Divider } from '../';
import theme from '../../theme/';
import { ThemeProvider } from 'styled-components';
import remcalc from 'remcalc';

describe('Popover', () => {
  test('Popover', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={theme}>
          <Container>
            <Target>Hello</Target>
            <Popover placement="right">
              <Item>Scale</Item>
              <Item>Restart</Item>
              <Item>Stop</Item>
              <Divider />
              <Item>Delete</Item>
            </Popover>
          </Container>
        </ThemeProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Divider', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={theme}>
          <Divider />
        </ThemeProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
    expect(tree).toHaveStyleRule(
      'border-top',
      `${remcalc(1)} solid ${theme.grey.replace(/ /g, '')}`
    );
  });
});
