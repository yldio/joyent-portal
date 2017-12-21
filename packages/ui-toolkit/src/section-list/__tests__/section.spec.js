import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import remcalc from 'remcalc';

import SectionList, { Item, Anchor } from '../';
import { Theme } from '../../mocks'
import theme from '../../theme'

describe('SectionList', () => {
  test('SectionList', () => {
    const tree = renderer
      .create(
        <Theme>
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
        </Theme>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('Item', () => {
    const tree = renderer
      .create(
        <Theme>
          <Item>
            <Anchor>Instances</Anchor>
          </Item>
        </Theme>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
    expect(tree).toHaveStyleRule('font-size', remcalc(15));
  });

  test('Anchor', () => {
    const tree = renderer
      .create(
        <Theme>
          <Anchor>Instances</Anchor>
        </Theme>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
    expect(tree).toHaveStyleRule('color', theme.secondary.replace(/ /g, ''));
  });

  test('Anchor', () => {
    const tree = renderer
      .create(
        <Theme>
          <Anchor active>Instances</Anchor>
        </Theme>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
    expect(tree).toHaveStyleRule('color', theme.primary.replace(/ /g, ''));
  });
});
