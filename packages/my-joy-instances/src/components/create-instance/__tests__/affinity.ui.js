import React from 'react';
import { toMatchImageSnapshot } from 'jest-image-snapshot';
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
  ).toMatchImageSnapshot();
});

it('<Header />', async () => {
  expect(
    await screenshot(
      <Theme ss>
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
  ).toMatchImageSnapshot();
});

it('<Header tag/>', async () => {
  expect(
    await screenshot(
      <Theme ss>
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
  ).toMatchImageSnapshot();
});
