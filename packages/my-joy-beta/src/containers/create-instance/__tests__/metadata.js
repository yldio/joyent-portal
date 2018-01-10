import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import Theme from '@mocks/theme';
import { Metadata } from '../metadata';

it('renders <Metadata /> without throwing', () => {
  expect(
    renderer
      .create(
        <Theme>
          <Metadata />
        </Theme>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Metadata expanded /> without throwing', () => {
  expect(
    renderer
      .create(
        <Theme>
          <Metadata expanded />
        </Theme>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Metadata metadata=[] /> without throwing', () => {
  const metadata = [
    { name: 'hello', value: 'world' },
    { name: 'hello2', value: 'world2' }
  ];

  expect(
    renderer
      .create(
        <Theme>
          <Metadata metadata={metadata} />
        </Theme>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Metadata metadata=[] expanded /> without throwing', () => {
  const metadata = [
    { name: 'hello', value: 'world' },
    { name: 'hello2', value: 'world2' }
  ];

  expect(
    renderer
      .create(
        <Theme>
          <Metadata metadata={metadata} expanded />
        </Theme>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Metadata addOpen expanded /> without throwing', () => {
  expect(
    renderer
      .create(
        <Theme>
          <Metadata addOpen expanded />
        </Theme>
      )
      .toJSON()
  ).toMatchSnapshot();
});
