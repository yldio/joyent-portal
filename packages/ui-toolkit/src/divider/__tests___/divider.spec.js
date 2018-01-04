import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import Divider from '../';
import { Theme } from '../../mocks';
import theme from '../../theme';

describe('Divider', () => {
  test('Default Divider', () => {
    const tree = renderer
      .create(
        <Theme>
          <Divider />
        </Theme>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
    expect(tree).toHaveStyleRule(
      'background-color',
      theme.grey.replace(/ /g, '')
    );
  });

  test('Transparent Divider', () => {
    const tree = renderer
      .create(
        <Theme>
          <Divider transparent />
        </Theme>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
    expect(tree).toHaveStyleRule('background-color', 'transparent');
  });
});
