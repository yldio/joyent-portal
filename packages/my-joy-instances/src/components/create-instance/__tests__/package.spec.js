import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { Filters, Packages, Package, Overview } from '../package';
import Theme from '@mocks/theme';

it('renders <Overview hasVms/> without throwing', () => {
  expect(
    renderer
      .create(
        <Theme>
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
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Overview /> without throwing', () => {
  expect(
    renderer
      .create(
        <Theme>
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
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Package /> without throwing', () => {
  expect(
    renderer
      .create(
        <Theme>
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
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Filters /> without throwing', () => {
  expect(
    renderer
      .create(
        <Theme>
          <Filters />
        </Theme>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Packages expanded /> without throwing', () => {
  expect(
    renderer
      .create(
        <Theme>
          <Packages expanded />
        </Theme>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Packages pristine={false} /> without throwing', () => {
  expect(
    renderer
      .create(
        <Theme>
          <Packages pristine={false} />
        </Theme>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Packages packages=[{name: stuff, imageName: stuff}] /> without throwing', () => {
  expect(
    renderer
      .create(
        <Theme>
          <Packages packages={[{ name: 'stuff', imageName: 'stuff' }]} />
        </Theme>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Packages loading /> without throwing', () => {
  expect(
    renderer
      .create(
        <Theme>
          <Packages loading />
        </Theme>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Packages isVmSelected /> without throwing', () => {
  expect(
    renderer
      .create(
        <Theme>
          <Packages isVmSelected />
        </Theme>
      )
      .toJSON()
  ).toMatchSnapshot();
});
