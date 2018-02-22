import React, { Fragment } from 'react';
import { Field } from 'redux-form';
import titleCase from 'title-case';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';
import remcalc from 'remcalc';

import {
  FormGroup,
  StatusLoader,
  Table,
  TableThead,
  TableTr,
  TableTh,
  TableTbody,
  TableTd,
  Checkbox,
  KeyValue,
  Popover,
  PopoverContainer,
  PopoverTarget,
  PopoverItem,
  ActionsIcon,
  DotIcon
} from 'joyent-ui-toolkit';

import Empty from '@components/empty';

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
      <Fragment>
        <TableTd padding="0" paddingLeft={remcalc(12)} middle left>
          <FormGroup paddingTop={remcalc(4)} name={name} field={Field}>
            <Checkbox noMargin />
          </FormGroup>
        </TableTd>
        <TableTd middle left>
          {name}
        </TableTd>
        <TableTd middle left>
          <DotIcon size={remcalc(12)} color={stateColor[state]} />{' '}
          {titleCase(state)}
        </TableTd>
        <TableTd xs="0" sm="160" middle left>
          {distanceInWordsToNow(created)}
        </TableTd>
        <TableTd xs="0" sm="160" middle left>
          {distanceInWordsToNow(updated)}
        </TableTd>
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
      </Fragment>
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
    typeLabel="name"
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
}) => (
  <Fragment>
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
        {snapshots.length
          ? snapshots.map(snapshot => (
              <Item
                onStart={() => onStart(snapshot)}
                onRemove={() => onRemove(snapshot)}
                key={snapshot.id}
                {...snapshot}
              />
            ))
          : null}
      </TableTbody>
    </Table>
    {!snapshots.length ? <Empty>You have no Snapshots</Empty> : null}
  </Fragment>
);
