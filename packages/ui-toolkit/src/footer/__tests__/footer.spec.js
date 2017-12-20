import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import Footer from '../';
import theme from '../../theme/';
import { ThemeProvider } from 'styled-components';
import remcalc from 'remcalc';

describe('Footer', () => {
  test('Footer', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={theme}>
          <Footer />
        </ThemeProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
    expect(tree).toHaveStyleRule('background-color', 'rgba(241,241,241,1)');
    expect(tree).toHaveStyleRule(
      'border-top',
      `${remcalc(1)} solid ${theme.grey.replace(/ /g, '')}`
    );
  });
});
