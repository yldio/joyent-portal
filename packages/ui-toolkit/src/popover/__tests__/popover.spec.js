import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import remcalc from 'remcalc';

import Popover, { Container, Target, Item, Divider } from '../';
import { Theme } from '../../mocks';
import theme from '../../theme';

describe('Popover', () => {
  test('Popover', () => {
    const tree = renderer
      .create(
        <Theme>
          <Container>
            <Target>Hello</Target>
            <Popover placement="right">
              <Item>Scale</Item>
              <Item>Restart</Item>
              <Item>Stop</Item>
              <Divider />
              <Item>Delete</Item>
            </Popover>
          </Container>
        </Theme>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('Divider', () => {
    const tree = renderer
      .create(
        <Theme>
          <Divider />
        </Theme>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
    expect(tree).toHaveStyleRule(
      'border-top',
      `${remcalc(1)} solid ${theme.grey.replace(/ /g, '')}`
    );
  });
});
