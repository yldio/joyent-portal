import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import Anchor from '../';
import Breadcrumb, { Item } from '../';
import { Theme } from '../../mocks'

describe('Breadcrumb', () => {
  test('Default Breadcrumb', () => {
    const tree = renderer
      .create(
        <Theme>
          <Breadcrumb>
            <Item>Home</Item>
            <Item>Warp Records Blog</Item>
            <Item>Services</Item>
            <Item>Nginx</Item>
          </Breadcrumb>
        </Theme>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('Default Item', () => {
    const tree = renderer
      .create(
        <Theme>
          <Item>Home</Item>
        </Theme>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
