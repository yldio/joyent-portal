/**
 * @jest-environment jsdom
 */

import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import { Store } from '../../mocks';

import { MEditor, EEditor } from '@components/manifest/editors';

it('renders <MEditor /> without throwing', () => {
  const tree = renderer
    .create(
      <Store>
        <MEditor input="" defaultValue="" readOnly />
      </Store>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders <MEditor /> without throwing', () => {
  const tree = renderer
    .create(
      <Store>
        <MEditor input="" defaultValue="" />
      </Store>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders <EEditor /> without throwing', () => {
  const tree = renderer
    .create(
      <Store>
        <EEditor input="" defaultValue="" readOnly />
      </Store>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders <EEditor /> without throwing', () => {
  const tree = renderer
    .create(
      <Store>
        <EEditor input="" defaultValue="" />
      </Store>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});