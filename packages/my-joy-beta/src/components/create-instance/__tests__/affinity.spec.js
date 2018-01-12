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
              'rule-instance-name': 'test',
              'rule-instance-conditional': 'must',
              'rule-instance-placement': 'same',
              'rule-instance-tag-key-pattern': 'equalling',
              'rule-instance-tag-value-pattern': 'equalling',
              'rule-instance-name-pattern': 'equalling',
              'rule-instance-tag-value': '',
              'rule-instance-tag-key': '',
              'rule-type': 'name'
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
              'rule-instance-name': 'test',
              'rule-instance-conditional': 'must',
              'rule-instance-placement': 'same',
              'rule-instance-tag-key-pattern': 'equalling',
              'rule-instance-tag-value-pattern': 'equalling',
              'rule-instance-name-pattern': 'equalling',
              'rule-instance-tag-value': '',
              'rule-instance-tag-key': '',
              'rule-type': 'name'
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
              'rule-instance-name': 'test',
              'rule-instance-conditional': 'must',
              'rule-instance-placement': 'same',
              'rule-instance-tag-key-pattern': 'equalling',
              'rule-instance-tag-value-pattern': 'equalling',
              'rule-instance-name-pattern': 'equalling',
              'rule-instance-tag-value': 'one',
              'rule-instance-tag-key': 'two',
              'rule-type': 'tag'
            }}
          />
        </Theme>
      )
      .toJSON()
  ).toMatchSnapshot();
});
