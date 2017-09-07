/**
 * @jest-environment jsdom
 */

import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import { Store } from '../../mocks';
import { reduxForm } from 'redux-form';

import { Name } from '@components/manifest';

const TestNameForm = reduxForm({ form: 'testNameForm' })(Name);

it('renders <Name /> without throwing', () => {
  const tree = renderer
    .create(
      <Store>
        <TestNameForm handleSubmit={() => {}} onCancel={() => {}} dirty />
      </Store>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders <Name /> without throwing', () => {
  const tree = renderer
    .create(
      <Store>
        <TestNameForm handleSubmit={() => {}} onCancel={() => {}} />
      </Store>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});