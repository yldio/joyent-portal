/**
 * @jest-environment jsdom
 */

import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import { Store, files } from '../../mocks';
import { reduxForm } from 'redux-form';

import { Environment } from '@components/manifest';
const TestEnvironmentForm = reduxForm({ form: 'testNameForm' })(Environment);

it('renders <TestEnvironmentForm /> without throwing', () => {
  const tree = renderer
    .create(
      <Store>
        <TestEnvironmentForm
          handleSubmit={() => {}}
          onCancel={() => {}}
          onAddFile={() => {}}
          onRemoveFile={() => {}}
          dirty
          defaultValue=""
          files={files}
          loading
        />
      </Store>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders <TestEnvironmentForm /> without throwing', () => {
  const tree = renderer
    .create(
      <Store>
        <TestEnvironmentForm
          handleSubmit={() => {}}
          onCancel={() => {}}
          onAddFile={() => {}}
          onRemoveFile={() => {}}
          dirty
          files={[]}
          readOnly
          loading
        />
      </Store>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});