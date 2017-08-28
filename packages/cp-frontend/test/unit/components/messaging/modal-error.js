/**
 * @jest-environment jsdom
 */

import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import ModalError from '@components/messaging/modal-error';

it('renders <ModalError /> without throwing', () => {
  const tree = renderer
    .create(
      <ModalError message="Modal error message" onCloseClick={() => {}} />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
