import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { List } from '../list';
import Theme from '@mocks/theme';

it('renders <List /> without throwing', () => {
  expect(
    renderer
      .create(
        <Theme>
          <List />
        </Theme>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <List loading /> without throwing', () => {
  expect(
    renderer
      .create(
        <Theme>
          <List loading />
        </Theme>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <List error /> without throwing', () => {
  expect(
    renderer
      .create(
        <Theme>
          <List error />
        </Theme>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <List instances /> without throwing', () => {
  const instances = [
    {
      name: '2252839a',
      status: 'RUNNING'
    },
    {
      name: 'f1bd1730',
      status: 'STOPPED'
    }
  ];

  expect(
    renderer
      .create(
        <Theme>
          <List instances={instances} />
        </Theme>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <List instances selected /> without throwing', () => {
  const instances = [
    {
      id: '2252839a-e698-ceec-afac-9549ad0c6624',
      name: '2252839a',
      status: 'RUNNING'
    },
    {
      id: 'f1bd1730-e8a6-4956-e738-d8e85cc6aa04',
      name: 'f1bd1730',
      status: 'STOPPED'
    }
  ];

  const selected = ['2252839a-e698-ceec-afac-9549ad0c6624'];

  expect(
    renderer
      .create(
        <Theme>
          <List instances={instances} selected={selected} />
        </Theme>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <List instances selected=all /> without throwing', () => {
  const instances = [
    {
      id: '2252839a-e698-ceec-afac-9549ad0c6624',
      name: '2252839a',
      status: 'RUNNING'
    },
    {
      id: 'f1bd1730-e8a6-4956-e738-d8e85cc6aa04',
      name: 'f1bd1730',
      status: 'STOPPED'
    }
  ];

  const selected = [
    '2252839a-e698-ceec-afac-9549ad0c6624',
    'f1bd1730-e8a6-4956-e738-d8e85cc6aa04'
  ];

  expect(
    renderer
      .create(
        <Theme>
          <List instances={instances} selected={selected} />
        </Theme>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <List instances selected=all allowedActions /> without throwing', () => {
  const instances = [
    {
      id: '2252839a-e698-ceec-afac-9549ad0c6624',
      name: '2252839a',
      status: 'RUNNING'
    },
    {
      id: 'f1bd1730-e8a6-4956-e738-d8e85cc6aa04',
      name: 'f1bd1730',
      status: 'STOPPED'
    }
  ];

  const selected = [
    '2252839a-e698-ceec-afac-9549ad0c6624',
    'f1bd1730-e8a6-4956-e738-d8e85cc6aa04'
  ];

  const allowedActions = {
    start: true,
    stop: false
  };

  expect(
    renderer
      .create(
        <Theme>
          <List
            instances={instances}
            selected={selected}
            allowedActions={allowedActions}
          />
        </Theme>
      )
      .toJSON()
  ).toMatchSnapshot();
});
