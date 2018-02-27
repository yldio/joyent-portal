import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { Toolbar } from '../toolbar';
import Theme from '@mocks/theme';

it('renders <Toolbar /> without throwing', () => {
  expect(
    renderer
      .create(
        <Theme>
          <Toolbar />
        </Theme>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Toolbar searchLabel /> without throwing', () => {
  expect(
    renderer
      .create(
        <Theme>
          <Toolbar searchLabel="Search label" />
        </Theme>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Toolbar searchPlaceholder /> without throwing', () => {
  expect(
    renderer
      .create(
        <Theme>
          <Toolbar searchPlaceholder="Search placeholder" />
        </Theme>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Toolbar searchable /> without throwing', () => {
  expect(
    renderer
      .create(
        <Theme>
          <Toolbar searchable={false} />
        </Theme>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Toolbar actionLabel /> without throwing', () => {
  expect(
    renderer
      .create(
        <Theme>
          <Toolbar actionLabel="Action label" />
        </Theme>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Toolbar actionable /> without throwing', () => {
  expect(
    renderer
      .create(
        <Theme>
          <Toolbar actionable={false} />
        </Theme>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Toolbar onActionClick /> without throwing', () => {
  expect(
    renderer
      .create(
        <Theme>
          <Toolbar onActionClick={() => null} />
        </Theme>
      )
      .toJSON()
  ).toMatchSnapshot();
});
