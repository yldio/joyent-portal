import React from 'react';
import { toMatchImageSnapshot } from 'jest-image-snapshot';
import renderer from 'react-test-renderer';
import screenshot from 'react-screenshot-renderer';

import { Rule, Header } from '../affinity';
import Theme from '@mocks/theme';

expect.extend({
  toMatchImageSnapshot
});

it('<Rule/>', async () => {
  expect(
    await screenshot(
      <Theme ss>
        <Rule />
      </Theme>
    )
  ).toMatchImageSnapshot();
});

it('<Rule/>', async () => {
  expect(
    await screenshot(
      <Theme ss>
        <Rule
          rule={{
            'rule-instance-name': 'test',
            'rule-instance-conditional': 'must',
            'rule-instance-placement': 'same',
            'rule-instance-tag-value-pattern': 'equalling',
            'rule-instance-name-pattern': 'equalling',
            'rule-instance-tag-value': '',
            'rule-instance-tag-key': '',
            'rule-type': 'name'
          }}
        />
      </Theme>
    )
  ).toMatchImageSnapshot();
});

it('<Header />', async () => {
  expect(
    await screenshot(
      <Theme ss>
        <Header
          rule={{
            'rule-instance-name': 'test',
            'rule-instance-conditional': 'must',
            'rule-instance-placement': 'same',
            'rule-instance-tag-value-pattern': 'equalling',
            'rule-instance-name-pattern': 'equalling',
            'rule-instance-tag-value': '',
            'rule-instance-tag-key': '',
            'rule-type': 'name'
          }}
        />
      </Theme>
    )
  ).toMatchImageSnapshot();
});

it('<Header tag/>', async () => {
  expect(
    await screenshot(
      <Theme ss>
        <Header
          rule={{
            'rule-instance-name': 'test',
            'rule-instance-conditional': 'must',
            'rule-instance-placement': 'same',
            'rule-instance-tag-value-pattern': 'equalling',
            'rule-instance-name-pattern': 'equalling',
            'rule-instance-tag-value': 'one',
            'rule-instance-tag-key': 'two',
            'rule-type': 'tag'
          }}
        />
      </Theme>
    )
  ).toMatchImageSnapshot();
});
