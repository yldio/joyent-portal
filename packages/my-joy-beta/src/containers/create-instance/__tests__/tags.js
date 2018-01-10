import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import Theme from '@mocks/theme';
import { Tags } from '../tags';

it('renders <Tags /> without throwing', () => {
  expect(
    renderer
      .create(
        <Theme>
          <Tags />
        </Theme>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Tags expanded /> without throwing', () => {
  expect(
    renderer
      .create(
        <Theme>
          <Tags expanded />
        </Theme>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Tags metadata=[] /> without throwing', () => {
  const metadata = [
    { name: 'hello', value: 'world' },
    { name: 'hello2', value: 'world2' }
  ];

  expect(
    renderer
      .create(
        <Theme>
          <Tags metadata={metadata} />
        </Theme>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Tags metadata=[] expanded /> without throwing', () => {
  const metadata = [
    { name: 'hello', value: 'world' },
    { name: 'hello2', value: 'world2' }
  ];

  expect(
    renderer
      .create(
        <Theme>
          <Tags metadata={metadata} expanded />
        </Theme>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Tags addOpen expanded /> without throwing', () => {
  expect(
    renderer
      .create(
        <Theme>
          <Tags addOpen expanded />
        </Theme>
      )
      .toJSON()
  ).toMatchSnapshot();
});
