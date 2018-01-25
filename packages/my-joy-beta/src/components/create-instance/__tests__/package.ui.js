import React from 'react';
import { toMatchImageSnapshot } from 'jest-image-snapshot';
import renderer from 'react-test-renderer';
import screenshot from 'react-screenshot-renderer';

import { Filters, Packages, Package, Overview } from '../package';
import Theme from '@mocks/theme';

expect.extend({
  toMatchImageSnapshot
});

it('<Overview hasVms/>', async () => {
  expect(
    await screenshot(
      <Theme ss>
        <Overview
          name="test"
          price="1"
          memory="1"
          vcpus="1"
          hasVms
          ssd
          disk="1"
          onCancel={() => {}}
        />
      </Theme>
    )
  ).toMatchImageSnapshot();
});

it('<Overview />', async () => {
  expect(
    await screenshot(
      <Theme ss>
        <Overview
          name="test"
          price="1"
          memory="1"
          vcpus="1"
          disk="1"
          onCancel={() => {}}
        />
      </Theme>
    )
  ).toMatchImageSnapshot();
});

it('<Package />', async () => {
  expect(
    await screenshot(
      <Theme ss>
        <Package
          name="test"
          price="1"
          memory="1"
          vcpus="1"
          disk="1"
          onCancel={() => {}}
        />
      </Theme>
    )
  ).toMatchImageSnapshot();
});

it('<Filters />', async () => {
  expect(
    await screenshot(
      <Theme ss>
        <Filters />
      </Theme>
    )
  ).toMatchImageSnapshot();
});

it('<Packages expanded />', async () => {
  expect(
    await screenshot(
      <Theme ss>
        <Packages expanded />
      </Theme>
    )
  ).toMatchImageSnapshot();
});

it('<Packages pristine={false} />', async () => {
  expect(
    await screenshot(
      <Theme ss>
        <Packages pristine={false} />
      </Theme>
    )
  ).toMatchImageSnapshot();
});

it('<Packages packages=[{name: stuff, imageName: stuff}] />', async () => {
  expect(
    await screenshot(
      <Theme ss>
        <Packages packages={[{ name: 'stuff', imageName: 'stuff' }]} />
      </Theme>
    )
  ).toMatchImageSnapshot();
});

it('<Packages loading />', async () => {
  expect(
    await screenshot(
      <Theme ss>
        <Packages loading />
      </Theme>
    )
  ).toMatchImageSnapshot();
});

it('<Packages isVmSelected />', async () => {
  expect(
    await screenshot(
      <Theme ss>
        <Packages isVmSelected />
      </Theme>
    )
  ).toMatchImageSnapshot();
});
