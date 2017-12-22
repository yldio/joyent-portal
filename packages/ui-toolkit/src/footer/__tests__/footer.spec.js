import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import remcalc from 'remcalc';

import Footer from '../';
import { Theme } from '../../mocks'
import theme from '../../theme'

describe('Footer', () => {
  test('Footer', () => {
    const tree = renderer
      .create(
        <Theme>
          <Footer />
        </Theme>
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
