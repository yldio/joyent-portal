import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { NameIcon } from 'joyent-ui-toolkit';

import Title from '../title';
import Theme from '@mocks/theme';

it('renders <Title /> without throwing', () => {
  expect(
    renderer
      .create(
        <Theme>
          <Title />
        </Theme>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Title label="Test"/> without throwing', () => {
  expect(
    renderer
      .create(
        <Theme>
          <Title label="Test" />
        </Theme>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Title icon="NameIcon"/> without throwing', () => {
  expect(
    renderer
      .create(
        <Theme>
          <Title icon={<NameIcon />} />
        </Theme>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Title icon="Test" label="Instance name"/> without throwing', () => {
  expect(
    renderer
      .create(
        <Theme>
          <Title icon={<NameIcon />} label="Instance name" />
        </Theme>
      )
      .toJSON()
  ).toMatchSnapshot();
});
