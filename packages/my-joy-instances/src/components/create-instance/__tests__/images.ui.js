import React from 'react';
import { toMatchImageSnapshot } from 'jest-image-snapshot';
import screenshot from 'react-screenshot-renderer';

import Images from '../image';
import Theme from '@mocks/theme';

expect.extend({
  toMatchImageSnapshot
});

it('<Images />', async () => {
  expect(
    await screenshot(
      <Theme ss>
        <Images />
      </Theme>
    )
  ).toMatchImageSnapshot();
});

it('<Images expanded />', async () => {
  expect(
    await screenshot(
      <Theme ss>
        <Images expanded />
      </Theme>
    )
  ).toMatchImageSnapshot();
});

it('<Images Images="test" />', async () => {
  expect(
    await screenshot(
      <Theme ss>
        <Images Images="[]" />
      </Theme>
    )
  ).toMatchImageSnapshot();
});

it('<Images pristine={false} />', async () => {
  expect(
    await screenshot(
      <Theme ss>
        <Images pristine={false} />
      </Theme>
    )
  ).toMatchImageSnapshot();
});

it('<Images images=[{name: stuff, imageName: stuff}] />', async () => {
  expect(
    await screenshot(
      <Theme ss>
        <Images images={[{ name: 'stuff', imageName: 'stuff' }]} />
      </Theme>
    )
  ).toMatchImageSnapshot();
});

it('<Images loading />', async () => {
  expect(
    await screenshot(
      <Theme ss>
        <Images loading />
      </Theme>
    )
  ).toMatchImageSnapshot();
});

it('<Images isVmSelected />', async () => {
  expect(
    await screenshot(
      <Theme ss>
        <Images isVmSelected />
      </Theme>
    )
  ).toMatchImageSnapshot();
});
