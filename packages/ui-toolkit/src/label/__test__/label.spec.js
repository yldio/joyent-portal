import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import Label from '../';
import theme from '../../theme/';
import { ThemeProvider } from 'styled-components';
import remcalc from 'remcalc';

describe('label', () => {
  test('label', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={theme}>
          <Label>I am a label</Label>
        </ThemeProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
    expect(tree).toHaveStyleRule('font-size', remcalc(15));
    expect(tree).toHaveStyleRule('color', theme.secondary.replace(/ /g, ''));
  });
});
