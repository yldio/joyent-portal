import React from 'react';
import { toMatchImageSnapshot } from 'jest-image-snapshot';
import screenshot from 'react-screenshot-renderer';

import { Table, TableTbody } from 'joyent-ui-toolkit';
import InstanceList, { Item } from '../list';
import Theme from '@mocks/theme';

expect.extend({
  toMatchImageSnapshot
});

it('<Item />', async () => {
  expect(
    await screenshot(
      <Theme ss>
        <Table>
          <TableTbody>
            <Item />
          </TableTbody>
        </Table>
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
            <Item mutating />
          </TableTbody>
        </Table>
      </Theme>
    )
  ).toMatchImageSnapshot();
});

it('<Item allowedActions />', async () => {
  const allowedActions = {
    start: true,
    stop: true
  };

  expect(
    await screenshot(
      <Theme ss>
        <Table>
          <TableTbody>
            <Item allowedActions={allowedActions} />
          </TableTbody>
        </Table>
      </Theme>
    )
  ).toMatchImageSnapshot();
});

it('<Item {...item} />', async () => {
  const item = {
    id: 'id',
    name: 'name',
    state: 'PROVISIONING'
  };

  expect(
    await screenshot(
      <Theme ss>
        <Table>
          <TableTbody>
            <Item {...item} />
          </TableTbody>
        </Table>
      </Theme>
    )
  ).toMatchImageSnapshot();
});

it('<InstanceList />', async () => {
  expect(
    await screenshot(
      <Theme ss>
        <InstanceList />
      </Theme>
    )
  ).toMatchImageSnapshot();
});

it('<InstanceList sortBy />', async () => {
  expect(
    await screenshot(
      <Theme ss>
        <InstanceList sortBy="state" />
      </Theme>
    )
  ).toMatchImageSnapshot();
});

it('<InstanceList sortBy sortOrder />', async () => {
  expect(
    await screenshot(
      <Theme ss>
        <InstanceList sortBy="state" sortOrder="asc" />
      </Theme>
    )
  ).toMatchImageSnapshot();
});

it('<InstanceList submitting />', async () => {
  expect(
    await screenshot(
      <Theme ss>
        <InstanceList submitting />
      </Theme>
    )
  ).toMatchImageSnapshot();
});

it('<InstanceList allSelected />', async () => {
  expect(
    await screenshot(
      <Theme ss>
        <InstanceList allSelected />
      </Theme>
    )
  ).toMatchImageSnapshot();
});

it('<InstanceList>{children}</InstanceList>', async () => {
  expect(
    await screenshot(
      <Theme ss>
        <InstanceList>
          <span>children</span>
        </InstanceList>
      </Theme>
    )
  ).toMatchImageSnapshot();
});
