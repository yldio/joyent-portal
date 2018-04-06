import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import KeyValue from '../';
import Theme from '../../mocks/theme';

it('renders <KeyValue /> without throwing', () => {
  expect(
    renderer
      .create(
        <Theme>
          <KeyValue />
        </Theme>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <KeyValue expanded={false} /> without throwing', () => {
  expect(
    renderer
      .create(
        <Theme>
          <KeyValue expanded={false} />
        </Theme>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <KeyValue input="input" /> without throwing', () => {
  expect(
    renderer
      .create(
        <Theme>
          <KeyValue input="input" />
        </Theme>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <KeyValue input="textarea" /> without throwing', () => {
  expect(
    renderer
      .create(
        <Theme>
          <KeyValue input="textarea" />
        </Theme>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <KeyValue type="tag" /> without throwing', () => {
  expect(
    renderer
      .create(
        <Theme>
          <KeyValue type="tag" />
        </Theme>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <KeyValue method="add" /> without throwing', () => {
  expect(
    renderer
      .create(
        <Theme>
          <KeyValue method="add" />
        </Theme>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <KeyValue method="edit" /> without throwing', () => {
  expect(
    renderer
      .create(
        <Theme>
          <KeyValue method="edit" />
        </Theme>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <KeyValue removing /> without throwing', () => {
  expect(
    renderer.create(
      <Theme>
        <KeyValue removing />
      </Theme>
    )
  ).toMatchSnapshot();
});

it('renders <KeyValue submitting /> without throwing', () => {
  expect(
    renderer.create(
      <Theme>
        <KeyValue submitting />
      </Theme>
    )
  ).toMatchSnapshot();
});
