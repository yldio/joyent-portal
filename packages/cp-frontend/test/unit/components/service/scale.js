/**
 * @jest-environment jsdom
 */

import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import { reduxForm } from 'redux-form';
import { Store, service } from '../../mocks';

import Scale from '@components/service/scale';

const TestScaleForm = reduxForm({ form: 'testScaleForm' })(Scale);

it('renders <Scale /> without throwing', () => {
  const tree = renderer
    .create(
      <Store>
        <TestScaleForm service={service} />
      </Store>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
