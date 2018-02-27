import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { Table, TableTbody } from 'joyent-ui-toolkit';
import InstanceList, { Item } from '../list';
import Theme from '@mocks/theme';

it('renders <Item /> without throwing', () => {
  expect(
    renderer
      .create(
        <Theme>
          <Table>
            <TableTbody>
              <Item />
            </TableTbody>
          </Table>
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
              <Item mutating />
            </TableTbody>
          </Table>
        </Theme>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Item allowedActions /> without throwing', () => {
  const allowedActions = {
    start: true,
    stop: true
  };

  expect(
    renderer
      .create(
        <Theme>
          <Table>
            <TableTbody>
              <Item allowedActions={allowedActions} />
            </TableTbody>
          </Table>
        </Theme>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Item {...item} /> without throwing', () => {
  const item = {
    id: 'id',
    name: 'name',
    state: 'PROVISIONING'
  };

  expect(
    renderer
      .create(
        <Theme>
          <Table>
            <TableTbody>
              <Item {...item} />
            </TableTbody>
          </Table>
        </Theme>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <InstanceList /> without throwing', () => {
  expect(
    renderer
      .create(
        <Theme>
          <InstanceList />
        </Theme>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <InstanceList sortBy /> without throwing', () => {
  expect(
    renderer
      .create(
        <Theme>
          <InstanceList sortBy="state" />
        </Theme>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <InstanceList sortBy sortOrder /> without throwing', () => {
  expect(
    renderer
      .create(
        <Theme>
          <InstanceList sortBy="state" sortOrder="asc" />
        </Theme>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <InstanceList submitting /> without throwing', () => {
  expect(
    renderer
      .create(
        <Theme>
          <InstanceList submitting />
        </Theme>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <InstanceList allSelected /> without throwing', () => {
  expect(
    renderer
      .create(
        <Theme>
          <InstanceList allSelected />
        </Theme>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <InstanceList>{children}</InstanceList> without throwing', () => {
  expect(
    renderer
      .create(
        <Theme>
          <InstanceList>
            <span>children</span>
          </InstanceList>
        </Theme>
      )
      .toJSON()
  ).toMatchSnapshot();
});
