import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import remcalc from 'remcalc';

import Label from '../';
import { Theme } from '../../mocks'
import theme from '../../theme'

describe('label', () => {
  test('label', () => {
    const tree = renderer
      .create(
        <Theme>
          <Label>I am a label</Label>
        </Theme>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
    expect(tree).toHaveStyleRule('font-size', remcalc(15));
    expect(tree).toHaveStyleRule('color', theme.secondary.replace(/ /g, ''));
  });
});
