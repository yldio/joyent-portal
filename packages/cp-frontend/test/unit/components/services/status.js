
/**
 * @jest-environment jsdom
 */

import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import ServiceStatus from '@components/services/status.js';
import { service } from '../../mocks';

xit('renders <ServiceStatus /> without throwing', () => {
  const tree = renderer
    .create(
      <ServiceStatus instanceStatuses={service.instanceStatuses} />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
