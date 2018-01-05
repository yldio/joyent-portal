import React from 'react';
import forceArray from 'force-array';
import find from 'lodash.find';
import { Field } from 'redux-form';
import titleCase from 'title-case';
import moment from 'moment';
import remcalc from 'remcalc';
import InstanceListActions from '@components/instances/footer';
import { KeyValue } from '@components/instances';
import ReduxForm from 'declarative-redux-form';
import { Margin } from 'styled-components-spacing';

import {
  FormGroup,
  ViewContainer,
  StatusLoader,
  Message,
  MessageTitle,
  MessageDescription,
  Table,
  TableThead,
  TableTr,
  TableTh,
  TableTbody,
  TableTd,
  Checkbox,
  Popover,
  PopoverContainer,
  PopoverTarget,
  PopoverItem,
  ActionsIcon,
  DotIcon
} from 'joyent-ui-toolkit';

const stateColor = {
  QUEUED: 'primary',
  CREATED: 'green'
};

export const Item = ({
  name,
  state,
  created,
  onStart,
  onRemove,
  updated,
  mutating
}) => (
  <TableTr>
    {!mutating ? (
      [
        <TableTd padding="0" paddingLeft={remcalc(12)} middle left>
          <FormGroup paddingTop={remcalc(4)} name={name} field={Field}>
            <Checkbox noMargin />
          </FormGroup>
        </TableTd>,
        <TableTd middle left>
          {name}
        </TableTd>,
        <TableTd middle left>
          <DotIcon
            width={remcalc(11)}
            height={remcalc(11)}
            borderRadius={remcalc(11)}
            color={stateColor[state]}
          />{' '}
          {titleCase(state)}
        </TableTd>,
        <TableTd xs="0" sm="160" middle left>
          {moment.unix(created).fromNow()}
        </TableTd>,
        <TableTd xs="0" sm="160" middle left>
          {moment.unix(updated).fromNow()}
        </TableTd>,
        <PopoverContainer clickable>
          <TableTd padding="0" hasBorder="left">
            <PopoverTarget box>
              <ActionsIcon />
            </PopoverTarget>
            <Popover placement="top">
              <PopoverItem onClick={onStart}>Start</PopoverItem>
              <PopoverItem onClick={onRemove}>Remove</PopoverItem>
            </Popover>
          </TableTd>
        </PopoverContainer>
      ]
    ) : (
      <TableTd colSpan="6">
        <StatusLoader />
      </TableTd>
    )}
  </TableTr>
);

export const AddForm = props => (
  <KeyValue
    {...props}
    method="create"
    input="input"
    type="snapshot"
    expanded
    onlyName
    noRemove
  />
);

export default ({
  snapshots = [],
  selected = [],
  error,
  handleChange = () => null,
  onAction = () => null,
  submitting = false,
  sortBy = 'name',
  sortOrder = 'desc',
  onSortBy = () => null,
  allSelected = false,
  toggleSelectAll = () => null,
  onStart,
  onRemove,
  ...rest
}) => {
  return (
    <Table>
      <TableThead>
        <TableTr>
          <TableTh xs="32" padding="0" paddingLeft={remcalc(12)} middle left>
            <FormGroup paddingTop={remcalc(4)}>
              <Checkbox
                checked={allSelected}
                disabled={submitting}
                onChange={toggleSelectAll}
                noMargin
              />
            </FormGroup>
          </TableTh>
          <TableTh
            onClick={() => onSortBy('name', sortOrder)}
            sortOrder={sortOrder}
            showSort={sortBy === 'name'}
            left
            middle
            actionable
          >
            <span>Name </span>
          </TableTh>
          <TableTh
            xs="150"
            onClick={() => onSortBy('state', sortOrder)}
            sortOrder={sortOrder}
            showSort={sortBy === 'state'}
            left
            middle
            actionable
          >
            <span>Status </span>
          </TableTh>
          <TableTh
            xs="0"
            sm="160"
            onClick={() => onSortBy('created', sortOrder)}
            sortOrder={sortOrder}
            showSort={sortBy === 'created'}
            left
            middle
            actionable
          >
            <span>Created </span>
          </TableTh>
          <TableTh
            xs="0"
            sm="160"
            onClick={() => onSortBy('updated', sortOrder)}
            sortOrder={sortOrder}
            showSort={sortBy === 'updated'}
            left
            middle
            actionable
          >
            <span>Updated </span>
          </TableTh>
          <TableTh xs="60" padding="0" />
        </TableTr>
      </TableThead>
      <TableTbody>
        {snapshots.map(snapshot => (
          <Item
            onStart={() => onStart(snapshot)}
            onRemove={() => onRemove(snapshot)}
            key={snapshot.id}
            {...snapshot}
          />
        ))}
      </TableTbody>
    </Table>
  );
};
