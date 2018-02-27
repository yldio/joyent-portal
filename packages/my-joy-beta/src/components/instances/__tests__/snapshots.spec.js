import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { Table, TableTbody } from 'joyent-ui-toolkit';
import SnapshotList, { Item } from '../snapshots';
import Theme from '@mocks/theme';

it('renders <Item /> without throwing', () => {
  expect(
    renderer
      .create(
        <Theme>
          <Item />
        </Theme>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Item mutating /> without throwing', () => {
  expect(
    renderer
      .create(
        <Theme>
          <Table>
            <TableTbody>
              <Item mutating="start" />
              <Item mutating="remove" />
            </TableTbody>
          </Table>
        </Theme>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Item {...item} /> without throwing', () => {
  const item = {
    updated: '12/09/2017',
    created: '12/09/2017',
    machineID: '657-sh',
    name: 'name',
    state: 'STARTED'
  };

  expect(
    renderer
      .create(
        <Theme>
          <Item {...item} />
        </Theme>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <SnapshotList /> without throwing', () => {
  expect(
    renderer
      .create(
        <Theme>
          <SnapshotList />
        </Theme>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Actions /> without throwing', () => {
  expect(
    renderer
      .create(
        <Theme>
          <SnapshotList selected={[1, 3]} />
        </Theme>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <SnapshotList sortBy /> without throwing', () => {
  expect(
    renderer
      .create(
        <Theme>
          <SnapshotList sortBy="state" />
        </Theme>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <SnapshotList sortBy sortOrder /> without throwing', () => {
  expect(
    renderer
      .create(
        <Theme>
          <SnapshotList sortBy="state" sortOrder="asc" />
        </Theme>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <SnapshotList submitting /> without throwing', () => {
  expect(
    renderer
      .create(
        <Theme>
          <SnapshotList submitting />
        </Theme>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <SnapshotList allSelected /> without throwing', () => {
  expect(
    renderer
      .create(
        <Theme>
          <SnapshotList allSelected />
        </Theme>
      )
      .toJSON()
  ).toMatchSnapshot();
});
