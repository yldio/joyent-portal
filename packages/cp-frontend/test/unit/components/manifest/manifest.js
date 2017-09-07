/**
 * @jest-environment jsdom
 */

import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import 'jest-styled-components';
import { Store } from '../../mocks';
import { reduxForm } from 'redux-form';

import { Manifest } from '@components/manifest';

const ManifestTestForm = reduxForm({ form: 'ManifestTestForm' })(Manifest);

it('renders <Manifest /> without throwing', () => {
  const renderer = new ShallowRenderer();
  renderer.render(
    <Store>
      <ManifestTestForm
        defaultValue="test"
        handleSubmit={() => {}}
        onCancel={() => {}}
        dirty
        loading
      />
    </Store>
  );
  const tree = renderer.getRenderOutput();
  expect(tree).toMatchSnapshot();
});

it('renders <Manifest /> without throwing', () => {
  const renderer = new ShallowRenderer();
  renderer.render(
      <Store>
        <ManifestTestForm
          defaultValue="test"
          handleSubmit={() => {}}
          onCancel={() => {}}
          loading
        />
      </Store>
    )
  const tree = renderer.getRenderOutput();
  expect(tree).toMatchSnapshot();
});

it('renders <Manifest /> without throwing', () => {
  const renderer = new ShallowRenderer();
  renderer.render(
      <Store>
        <ManifestTestForm
          defaultValue="test"
          handleSubmit={() => {}}
          onCancel={() => {}}
        />
      </Store>
    )
  const tree = renderer.getRenderOutput();
  expect(tree).toMatchSnapshot();
});