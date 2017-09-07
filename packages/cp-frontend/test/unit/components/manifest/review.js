/**
 * @jest-environment jsdom
 */

import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import { Store, services } from '../../mocks';

import { Review } from '@components/manifest';

it('renders <Review /> without throwing', () => {
  const tree = renderer
    .create(
      <Store>
        <Review
          handleSubmit={() => {}}
          onEnvironmentToggle={() => {}}
          onCancel={() => {}}
          dirty
          loading
          environmentToggles={{ name: test }}
          state={{ services }}
        />
      </Store>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders <Review /> without throwing', () => {
  const tree = renderer
    .create(
      <Store>
        <Review
          handleSubmit={() => {}}
          onEnvironmentToggle={() => {}}
          onCancel={() => {}}
          dirty
          environmentToggles={{ name: test }}
          state={{ services }}
        />
      </Store>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders <Review /> without throwing', () => {
  const tree = renderer
    .create(
      <Store>
        <Review
          handleSubmit={() => {}}
          onEnvironmentToggle={() => {}}
          onCancel={() => {}}
          environmentToggles={{ name: test }}
          state={{ services }}
        />
      </Store>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});