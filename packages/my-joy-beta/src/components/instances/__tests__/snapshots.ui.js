import React from 'react';
import { toMatchImageSnapshot } from 'jest-image-snapshot';
import screenshot from 'react-screenshot-renderer';

import { Table, TableTbody } from 'joyent-ui-toolkit';
import SnapshotList, { Item } from '../snapshots';
import Theme from '@mocks/theme';

expect.extend({
  toMatchImageSnapshot
});

it('<Item />', async () => {
  expect(
    await screenshot(
      <Theme ss>
        <Item />
      </Theme>
    )
  ).toMatchImageSnapshot();
});

it('<Item mutating />', async () => {
  expect(
    await screenshot(
      <Theme ss>
        <Table>
          <TableTbody>
            <Item mutating='start' />
            <Item mutating='remove' />
          </TableTbody>
        </Table>
      </Theme>
    )
  ).toMatchImageSnapshot();
});

it('<Item {...item} />', async () => {
  const item = {
    updated: '12/09/2017',
    created: '12/09/2017',
    machineID: '657-sh',
    name: 'name',
    state: 'STARTED'
  };

  expect(
    await screenshot(
      <Theme ss>
        <Item {...item} />
      </Theme>
    )
  ).toMatchImageSnapshot();
});

it('<SnapshotList />', async () => {
  expect(
    await screenshot(
      <Theme ss>
        <SnapshotList />
      </Theme>
    )
  ).toMatchImageSnapshot();
});

it('<Actions />', async () => {
  expect(
    await screenshot(
      <Theme ss>
        <SnapshotList selected={[1, 3]} />
      </Theme>
    )
  ).toMatchImageSnapshot();
});

it('<SnapshotList sortBy />', async () => {
  expect(
    await screenshot(
      <Theme ss>
        <SnapshotList sortBy="state" />
      </Theme>
    )
  ).toMatchImageSnapshot();
});

it('<SnapshotList sortBy sortOrder />', async () => {
  expect(
    await screenshot(
      <Theme ss>
        <SnapshotList sortBy="state" sortOrder="asc" />
      </Theme>
    )
  ).toMatchImageSnapshot();
});

it('<SnapshotList submitting />', async () => {
  expect(
    await screenshot(
      <Theme ss>
        <SnapshotList submitting />
      </Theme>
    )
  ).toMatchImageSnapshot();
});

it('<SnapshotList allSelected />', async () => {
  expect(
    await screenshot(
      <Theme ss>
        <SnapshotList allSelected />
      </Theme>
    )
  ).toMatchImageSnapshot();
});
