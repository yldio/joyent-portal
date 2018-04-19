import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import Theme from '@mocks/theme';
import { UserScript } from '../user-script';

it('renders <UserScript /> without throwing', () => {
  expect(
    renderer
      .create(
        <Theme>
          <UserScript />
        </Theme>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <UserScript proceeded /> without throwing', () => {
  expect(
    renderer
      .create(
        <Theme>
          <UserScript proceeded />
        </Theme>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <UserScript expanded /> without throwing', () => {
  expect(
    renderer
      .create(
        <Theme>
          <UserScript expanded />
        </Theme>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <UserScript expanded create /> without throwing', () => {
  expect(
    renderer
      .create(
        <Theme>
          <UserScript expanded create />
        </Theme>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <UserScript expanded create formOpen /> without throwing', () => {
  expect(
    renderer
      .create(
        <Theme>
          <UserScript expanded create formOpen />
        </Theme>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <UserScript expanded edit formOpen /> without throwing', () => {
  expect(
    renderer
      .create(
        <Theme>
          <UserScript expanded edit formOpen />
        </Theme>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <UserScript expanded edit formOpen script /> without throwing', () => {
  expect(
    renderer
      .create(
        <Theme>
          <UserScript expanded edit formOpen script={{ value: 'hey' }} />
        </Theme>
      )
      .toJSON()
  ).toMatchSnapshot();
});
