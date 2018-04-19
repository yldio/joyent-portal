import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { Rule, Header } from '../affinity';
import Theme from '@mocks/theme';

it('renders <Rule/> without throwing', () => {
  expect(
    renderer
      .create(
        <Theme>
          <Rule />
        </Theme>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Rule/> without throwing', () => {
  expect(
    renderer
      .create(
        <Theme>
          <Rule
            rule={{
              conditional: 'must',
              placement: 'same',
              pattern: 'equalling',
              value: 'test',
              key: '',
              type: 'name'
            }}
          />
        </Theme>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Header /> without throwing', () => {
  expect(
    renderer
      .create(
        <Theme>
          <Header
            rule={{
              conditional: 'must',
              placement: 'same',
              pattern: 'equalling',
              value: 'test',
              key: '',
              type: 'name'
            }}
          />
        </Theme>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Header tag/> without throwing', () => {
  expect(
    renderer
      .create(
        <Theme>
          <Header
            rule={{
              conditional: 'must',
              placement: 'same',
              pattern: 'equalling',
              value: 'one',
              key: 'two',
              type: 'tag'
            }}
          />
        </Theme>
      )
      .toJSON()
  ).toMatchSnapshot();
});
