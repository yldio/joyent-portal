import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import Anchor from '../';
import { Theme } from '../../mocks'
import theme from '../../theme'

describe('Anchor', () => {
  test('Default Anchor', () => {
    const tree = renderer
      .create(
        <Theme>
          <Anchor href="https://joyent.com">Inspire the lazy</Anchor>
        </Theme>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
    expect(tree).toHaveStyleRule('color', theme.primary.replace(/ /g, ''));
  });

  test('Reversed Anchor', () => {
    const tree = renderer
      .create(
        <Theme>
          <Anchor reversed href="https://joyent.com">
            Inspire the lazy
          </Anchor>
        </Theme>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
    expect(tree).toHaveStyleRule('color', theme.white.replace(/ /g, ''));
  });

  test('Disabled Anchor', () => {
    const tree = renderer
      .create(
        <Theme>
          <Anchor disabled href="https://joyent.com">
            Inspire the lazy
          </Anchor>
        </Theme>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
    expect(tree).toHaveStyleRule('color', theme.grey.replace(/ /g, ''));
  });
});
