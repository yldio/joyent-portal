import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import Theme from '@mocks/theme';

import { KeyValue } from '../key-value';

// KeyValue.propTypes = {
//   input: PropTypes.oneOf(['input', 'textarea']).isRequired,
//   type: PropTypes.string.isRequired,
//   method: PropTypes.oneOf(['add', 'edit']).isRequired,
//   removing: PropTypes.bool.isRequired,
//   expanded: PropTypes.bool.isRequired,
//   onToggleExpanded: PropTypes.func,
//   onCancel: PropTypes.func,
//   onRemove: PropTypes.func
// };


it('renders <KeyValue /> without throwing', () => expect(renderer.create(<Theme><KeyValue /></Theme>).toJSON()).toMatchSnapshot());

it('renders <KeyValue input="input" /> without throwing', () =>
  expect(
    renderer.create(<Theme><KeyValue input="input" /></Theme>).toJSON()
  ).toMatchSnapshot());

it('renders <KeyValue input="textarea" /> without throwing', () =>
  expect(
    renderer.create(<Theme><KeyValue input="textarea" /></Theme>).toJSON()
  ).toMatchSnapshot());

it('renders <KeyValue type="tag" /> without throwing', () =>
  expect(renderer.create(<Theme><KeyValue type="tag" /></Theme>).toJSON()).toMatchSnapshot());

it('renders <KeyValue method="add" /> without throwing', () =>
  expect(
    renderer.create(<Theme><KeyValue method="add" /></Theme>).toJSON()
  ).toMatchSnapshot());

it('renders <KeyValue method="edit" /> without throwing', () =>
  expect(
    renderer.create(<Theme><KeyValue method="edit" /></Theme>).toJSON()
  ).toMatchSnapshot());

it('renders <KeyValue removing /> without throwing', () =>
  expect(renderer.create(<Theme><KeyValue removing /></Theme>).toJSON()).toMatchSnapshot());

it('renders <KeyValue submitting removing /> without throwing', () =>
  expect(
    renderer.create(<Theme><KeyValue submitting removing /></Theme>).toJSON()
  ).toMatchSnapshot());

it('renders <KeyValue expanded /> without throwing', () =>
  expect(renderer.create(<Theme><KeyValue expanded /></Theme>).toJSON()).toMatchSnapshot());

it('renders <KeyValue expanded removing /> without throwing', () =>
  expect(
    renderer.create(<Theme><KeyValue expanded removing /></Theme>).toJSON()
  ).toMatchSnapshot());

it('renders <KeyValue expanded submitting removing /> without throwing', () =>
  expect(
    renderer.create(<Theme><KeyValue expanded submitting removing /></Theme>).toJSON()
  ).toMatchSnapshot());
