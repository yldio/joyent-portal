/**
 * @jest-environment jsdom
 */

import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import { Store } from '../../mocks';

import { Progress } from '@components/manifest';

it('renders <Progress /> without throwing', () => {
  const tree = renderer
    .create(
      <Store>
        <Progress stage="name" create />
      </Store>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders <Progress /> without throwing', () => {
  const tree = renderer
    .create(
      <Store>
        <Progress stage="name" edit />
      </Store>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders <Progress /> without throwing', () => {
  const tree = renderer
    .create(
      <Store>
        <Progress stage="manifest" create />
      </Store>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders <Progress /> without throwing', () => {
  const tree = renderer
    .create(
      <Store>
        <Progress stage="environment" create />
      </Store>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders <Progress /> without throwing', () => {
  const tree = renderer
    .create(
      <Store>
        <Progress stage="review" create />
      </Store>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders <Progress /> without throwing', () => {
  const tree = renderer
    .create(
      <Store>
        <Progress stage="manifest" edit />
      </Store>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders <Progress /> without throwing', () => {
  const tree = renderer
    .create(
      <Store>
        <Progress stage="environment" edit />
      </Store>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders <Progress /> without throwing', () => {
  const tree = renderer
    .create(
      <Store>
        <Progress stage="review" edit />
      </Store>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});