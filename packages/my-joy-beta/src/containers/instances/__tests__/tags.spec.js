import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { Tags } from '../tags';
import Theme from '@mocks/theme';

it('renders <Tags /> without throwing', () => {
  expect(
    renderer
      .create(
        <Theme>
          <Tags />
        </Theme>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Tags loading /> without throwing', () => {
  expect(
    renderer
      .create(
        <Theme>
          <Tags loading />
        </Theme>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Tags error /> without throwing', () => {
  expect(
    renderer
      .create(
        <Theme>
          <Tags error />
        </Theme>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Tags addOpen /> without throwing', () => {
  expect(
    renderer
      .create(
        <Theme>
          <Tags addOpen />
        </Theme>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Tags editing /> without throwing', () => {
  const editing = {
    name: 'name1',
    value: 'value1',
    id: 'name1-value1',
    form: 'editing-form'
  };

  expect(
    renderer
      .create(
        <Theme>
          <Tags editing={editing} />
        </Theme>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Tags editing.removing /> without throwing', () => {
  const editing = {
    name: 'name1',
    value: 'value1',
    id: 'name1-value1',
    form: 'editing-form',
    removing: true
  };

  expect(
    renderer
      .create(
        <Theme>
          <Tags editing={editing} />
        </Theme>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Tags tags /> without throwing', () => {
  const tags = [{
    name: 'name1',
    value: 'value1',
    id: 'name1-value1'
  }, {
    name: 'name2',
    value: 'value2',
    id: 'name2-value2'
  }, {
    name: 'name3',
    value: 'value3',
    id: 'name3-value3'
  }];

  expect(
    renderer
      .create(
        <Theme>
          <Tags tags={tags} />
        </Theme>
      )
      .toJSON()
  ).toMatchSnapshot();
});