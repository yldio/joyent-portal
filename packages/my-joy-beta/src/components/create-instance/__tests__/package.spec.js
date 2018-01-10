import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import Packages from '../package';
import Theme from '@mocks/theme';

it('renders <Packages /> without throwing', () => {
  expect(
    renderer
      .create(
        <Theme>
          <Packages />
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
