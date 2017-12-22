import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { Metadata } from '../metadata';
import Theme from '@mocks/theme';

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

it('renders <Metadata loading /> without throwing', () => {
  expect(
    renderer
      .create(
        <Theme>
          <Metadata loading />
        </Theme>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Metadata error /> without throwing', () => {
  expect(
    renderer
      .create(
        <Theme>
          <Metadata error />
        </Theme>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Metadata addOpen /> without throwing', () => {
  expect(
    renderer
      .create(
        <Theme>
          <Metadata addOpen />
        </Theme>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Metadata metadata /> without throwing', () => {
  const metadata = [{
    name: 'name1',
    value: 'value1',
    id: 'name1-value1'
  }, {
    name: 'name2',
    value: 'value2',
    id: 'name2-value2',
    expanded: true
  }, {
    name: 'name3',
    value: 'value3',
    id: 'name3-value3',
    expanded: true,
    removing: true
  }];

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