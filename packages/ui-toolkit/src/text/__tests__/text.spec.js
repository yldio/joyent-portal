import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import remcalc from 'remcalc';

import { P, H1, H2, H3, H4, H5, H6, Small, Sup } from '../';
import { Theme } from '../../mocks';
import theme from '../../theme';

describe('Button', () => {
  test('Paragraph', () => {
    const tree = renderer
      .create(
        <Theme>
          <P>Inspire the lazy</P>
        </Theme>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
    expect(tree).toHaveStyleRule('color', theme.text.replace(/ /g, ''));
    expect(tree).toHaveStyleRule('font-size', remcalc(15));
  });

  test('Small', () => {
    const tree = renderer
      .create(
        <Theme>
          <Small>Inspire the lazy</Small>
        </Theme>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
    expect(tree).toHaveStyleRule('color', theme.text.replace(/ /g, ''));
    expect(tree).toHaveStyleRule('font-size', remcalc(13));
  });

  test('H1', () => {
    const tree = renderer
      .create(
        <Theme>
          <H1>Inspire the lazy</H1>
        </Theme>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
    expect(tree).toHaveStyleRule('color', theme.text.replace(/ /g, ''));
    expect(tree).toHaveStyleRule('font-size', remcalc(36));
  });

  test('H2', () => {
    const tree = renderer
      .create(
        <Theme>
          <H2>Inspire the lazy</H2>
        </Theme>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
    expect(tree).toHaveStyleRule('color', theme.text.replace(/ /g, ''));
    expect(tree).toHaveStyleRule('font-size', remcalc(24));
  });

  test('H3', () => {
    const tree = renderer
      .create(
        <Theme>
          <H3>Inspire the lazy</H3>
        </Theme>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
    expect(tree).toHaveStyleRule('color', theme.text.replace(/ /g, ''));
    expect(tree).toHaveStyleRule('font-size', remcalc(21));
  });

  test('H4', () => {
    const tree = renderer
      .create(
        <Theme>
          <H4>Inspire the lazy</H4>
        </Theme>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
    expect(tree).toHaveStyleRule('color', theme.text.replace(/ /g, ''));
    expect(tree).toHaveStyleRule('font-size', remcalc(15));
    expect(tree).toHaveStyleRule(
      'font-weight',
      `${theme.font.weight.normal}`
    );
  });

  test('H5', () => {
    const tree = renderer
      .create(
        <Theme>
          <H5>Inspire the lazy</H5>
        </Theme>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
    expect(tree).toHaveStyleRule('color', theme.text.replace(/ /g, ''));
    expect(tree).toHaveStyleRule('font-size', remcalc(15));
  });

  test('H6', () => {
    const tree = renderer
      .create(
        <Theme>
          <H6>Inspire the lazy</H6>
        </Theme>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
    expect(tree).toHaveStyleRule('color', theme.text.replace(/ /g, ''));
    expect(tree).toHaveStyleRule('font-size', remcalc(13));
  });

  test('Sup', () => {
    const tree = renderer
      .create(
        <Theme>
          <Sup>Inspire the lazy</Sup>
        </Theme>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
    expect(tree).toHaveStyleRule('color', theme.primary.replace(/ /g, ''));
    expect(tree).toHaveStyleRule('font-size', remcalc(8));
  });

  test('Sup badge', () => {
    const tree = renderer
      .create(
        <Theme>
          <Sup badge>Inspire the lazy</Sup>
        </Theme>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
    expect(tree).toHaveStyleRule('color', theme.white.replace(/ /g, ''));
    expect(tree).toHaveStyleRule('font-size', remcalc(8));
  });
});
