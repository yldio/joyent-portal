import React from 'react';
import { toMatchImageSnapshot } from 'jest-image-snapshot';
import screenshot from 'react-screenshot-renderer';

import { NameIcon } from 'joyent-ui-toolkit';

import Title from '../title';
import Theme from '@mocks/theme';

expect.extend({
  toMatchImageSnapshot
});

it('<Title />', async () => {
  expect(
    await screenshot(
      <Theme ss>
        <Title />
      </Theme>
    )
  ).toMatchImageSnapshot();
});

it('<Title label="Test"/>', async () => {
  expect(
    await screenshot(
      <Theme ss>
        <Title label="Test" />
      </Theme>
    )
  ).toMatchImageSnapshot();
});

it('<Title icon="NameIcon"/>', async () => {
  expect(
    await screenshot(
      <Theme ss>
        <Title icon={<NameIcon />} />
      </Theme>
    )
  ).toMatchImageSnapshot();
});

it('<Title icon="Test" label="Instance name"/>', async () => {
  expect(
    await screenshot(
      <Theme ss>
        <Title icon={<NameIcon />} label="Instance name" />
      </Theme>
    )
  ).toMatchImageSnapshot();
});
