import React from 'react';
import renderer from 'react-test-renderer';
import { reduxForm } from 'redux-form';
import 'jest-styled-components';

import Store from '@mocks/store';
import KeyValue from '../key-value';

const KeyValueForm = reduxForm()(KeyValue);

it('renders <KeyValue /> without throwing', () => {
  const tree = renderer
    .create(
      <Store>
        <KeyValueForm />
      </Store>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders <KeyValue textarea /> with textareas', () => {
  const tree = renderer
    .create(
      <Store>
        <KeyValueForm textarea />
      </Store>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders <KeyValue expanded /> expanded', () => {
  const tree = renderer
    .create(
      <Store>
        <KeyValueForm expanded />
      </Store>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders <KeyValue submitting /> with loader', () => {
  const tree = renderer
    .create(
      <Store>
        <KeyValueForm submitting />
      </Store>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders <KeyValue first /> without top margin', () => {
  const tree = renderer
    .create(
      <Store>
        <KeyValueForm first />
      </Store>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders <KeyValue last /> with bottom border', () => {
  const tree = renderer
    .create(
      <Store>
        <KeyValueForm last />
      </Store>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders <KeyValue label /> with proper label', () => {
  const tree = renderer
    .create(
      <Store>
        <KeyValueForm label="Label" />
      </Store>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
