import React from 'react';
import { toMatchImageSnapshot } from 'jest-image-snapshot';
import screenshot from 'react-screenshot-renderer';

import { List } from '../list';
import Theme from '@mocks/theme';

expect.extend({
  toMatchImageSnapshot
});

it('<List />', async () => {
  expect(
    await screenshot(
      <Theme ss>
        <List />
      </Theme>
    )
  ).toMatchImageSnapshot();
});

it('<List loading />', async () => {
  expect(
    await screenshot(
      <Theme ss>
        <List loading />
      </Theme>
    )
  ).toMatchImageSnapshot();
});

it('<List error />', async () => {
  expect(
    await screenshot(
      <Theme ss>
        <List error />
      </Theme>
    )
  ).toMatchImageSnapshot();
});

it('<List instances />', async () => {
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
    await screenshot(
      <Theme ss>
        <List instances={instances} />
      </Theme>
    )
  ).toMatchImageSnapshot();
});

it('<List instances selected />', async () => {
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
    await screenshot(
      <Theme ss>
        <List instances={instances} selected={selected} />
      </Theme>
    )
  ).toMatchImageSnapshot();
});

it('<List instances selected=all />', async () => {
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
    await screenshot(
      <Theme ss>
        <List instances={instances} selected={selected} />
      </Theme>
    )
  ).toMatchImageSnapshot();
});

it('<List instances selected=all allowedActions />', async () => {
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
    await screenshot(
      <Theme ss>
        <List
          instances={instances}
          selected={selected}
          allowedActions={allowedActions}
        />
      </Theme>
    )
  ).toMatchImageSnapshot();
});
