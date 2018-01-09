import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import Images from '../image';
import Theme from '@mocks/theme';

it('renders <Images /> without throwing', () => {
  expect(
    renderer
      .create(
        <Theme>
          <Images />
        </Theme>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Images expanded /> without throwing', () => {
  expect(
    renderer
      .create(
        <Theme>
          <Images expanded />
        </Theme>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Images Images="test" /> without throwing', () => {
  expect(
    renderer
      .create(
        <Theme>
          <Images Images="[]" />
        </Theme>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Images pristine={false} /> without throwing', () => {
  expect(
    renderer
      .create(
        <Theme>
          <Images pristine={false} />
        </Theme>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Images images=[{name: stuff, imageName: stuff}] /> without throwing', () => {
  expect(
    renderer
      .create(
        <Theme>
          <Images images={[{ name: 'stuff', imageName: 'stuff' }]} />
        </Theme>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Images loading /> without throwing', () => {
  expect(
    renderer
      .create(
        <Theme>
          <Images loading />
        </Theme>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Images isVmSelected /> without throwing', () => {
  expect(
    renderer
      .create(
        <Theme>
          <Images isVmSelected />
        </Theme>
      )
      .toJSON()
  ).toMatchSnapshot();
});
