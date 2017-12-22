import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import remcalc from 'remcalc';

import Table, { Thead, Tfoot, Tr, Th, Tbody, Td } from '../';
import { Theme } from '../../mocks'
import theme from '../../theme'

describe('Table', () => {
  test('Table', () => {
    const tree = renderer
      .create(
        <Theme>
          <Table />
        </Theme>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
    expect(tree).toHaveStyleRule('width', '100%');
    expect(tree).toHaveStyleRule('border-collapse', 'separate');
    expect(tree).toHaveStyleRule('table-layout', 'fixed');
  });

  test('Tr', () => {
    const tree = renderer
      .create(
        <Theme>
          <Tr />
        </Theme>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
    expect(tree).toHaveStyleRule(
      'background-color',
      theme.white.replace(/ /g, '')
    );
    expect(tree).toHaveStyleRule('color', theme.text.replace(/ /g, ''));
  });

  test('Td', () => {
    const tree = renderer
      .create(
        <Theme>
          <Td />
        </Theme>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
    expect(tree).toHaveStyleRule('border-color', theme.grey.replace(/ /g, ''));
  });

  test('Tbody', () => {
    const tree = renderer
      .create(
        <Theme>
          <Tbody />
        </Theme>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
    expect(tree).toHaveStyleRule('width', '100%');
  });

  test('Tbody disabled', () => {
    const tree = renderer
      .create(
        <Theme>
          <Tbody disabled />
        </Theme>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
    expect(tree).toHaveStyleRule('border-color', theme.grey.replace(/ /g, ''));
  });

  test('Th', () => {
    const tree = renderer
      .create(
        <Theme>
          <Th />
        </Theme>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
    expect(tree).toHaveStyleRule('border-color', theme.grey.replace(/ /g, ''));
    expect(tree).toHaveStyleRule('color', theme.greyLight.replace(/ /g, ''));
  });

  test('Thead', () => {
    const tree = renderer
      .create(
        <Theme>
          <Thead />
        </Theme>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
    expect(tree).toHaveStyleRule('width', '100%');
    expect(tree).toHaveStyleRule(
      'background',
      theme.background.replace(/ /g, '')
    );
  });

  test('Tfoot', () => {
    const tree = renderer
      .create(
        <Theme>
          <Tfoot />
        </Theme>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
    expect(tree).toHaveStyleRule('width', '100%');
    expect(tree).toHaveStyleRule(
      'background',
      theme.background.replace(/ /g, '')
    );
  });
});
