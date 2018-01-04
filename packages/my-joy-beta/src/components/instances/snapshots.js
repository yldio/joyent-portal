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

const Item = ({ name, state, created, handleActions, updated, machineID }) => (
  <TableTr>
    <TableTd padding="0" paddingLeft={remcalc(12)} middle left>
      <FormGroup paddingTop={remcalc(4)} name={name} field={Field}>
        <Checkbox noMargin />
      </FormGroup>
    </TableTd>
    <TableTd middle left>
      {name}
    </TableTd>
    <TableTd middle left>
      <DotIcon
        width={remcalc(11)}
        height={remcalc(11)}
        borderRadius={remcalc(11)}
        color={stateColor[state]}
      />{' '}
      {titleCase(state)}
    </TableTd>
    <TableTd xs="0" sm="160" middle left>
      {moment.unix(created).fromNow()}
    </TableTd>
    <TableTd xs="0" sm="160" middle left>
      {moment.unix(updated).fromNow()}
    </TableTd>
    <PopoverContainer clickable>
      <TableTd padding="0" hasBorder="left">
        <PopoverTarget box>
          <ActionsIcon />
        </PopoverTarget>
        <Popover placement="top">
          <PopoverItem
            onClick={e => handleActions(e, 'start', [{ name, machineID }])}
          >
            Start
          </PopoverItem>
          <PopoverItem
            onClick={e => handleActions(e, 'delete', [{ name, machineID }])}
          >
            Delete
          </PopoverItem>
        </Popover>
      </TableTd>
    </PopoverContainer>
  </TableTr>
);

export default ({
  snapshots = [],
  selected = [],
  loading,
  error,
  handleChange = () => null,
  onAction = () => null,
  handleSubmit,
  submitting = false,
  sortBy = 'name',
  sortOrder = 'desc',
  onSortBy = () => null,
  allSelected = false,
  toggleSelectAll = () => null,
  hideCreateSnapshot = () => null,
  showCreateSnapshot = false,
  machineID,
  ...rest
}) => {
  const allowedActions = {
    delete: selected.length > 0,
    start: selected.length === 1
  };

  const handleActions = (ev, name, items) => {
    ev.stopPropagation();
    ev.preventDefault();

    onAction({
      name,
      items: items || selected
    });
  };

  const _footer =
    !loading && selected.length > 0 ? (
      <InstanceListActions
        allowedActions={allowedActions}
        submitting={submitting}
        onStart={e => handleActions(e, 'start')}
        onDelete={e => handleActions(e, 'delete')}
      />
    ) : null;

  const _snapshots = forceArray(snapshots);

  const _loading = !_snapshots.length &&
    loading && (
      <ViewContainer center>
        <StatusLoader />
      </ViewContainer>
    );

  const items = _snapshots.map(snapshot => {
    const { name } = snapshot;
    const isSelected = Boolean(find(selected, ['name', name]));
    const isSubmitting = isSelected && submitting;

    return {
      ...snapshot,
      isSubmitting,
      isSelected
    };
  });

  const _error = error &&
    !submitting && (
      <Message error>
        <MessageTitle>Ooops!</MessageTitle>
        <MessageDescription>{error}</MessageDescription>
      </Message>
    );

  const _table = !loading && (
    <Table>
      <TableThead>
        <TableTr>
          <TableTh xs="32" padding="0" paddingLeft={remcalc(12)} middle left>
            <FormGroup paddingTop={remcalc(4)}>
              <Checkbox
                checked={allSelected}
                disabled={submitting}
                onChange={() => toggleSelectAll(selected, _snapshots)}
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
        {items.length > 0 &&
          items.map(snapshot => (
            <Item
              machineID={machineID}
              handleActions={handleActions}
              key={snapshot.name}
              {...snapshot}
            />
          ))}
      </TableTbody>
    </Table>
  );
  const _createSnapshot =
    !loading && showCreateSnapshot === true ? (
      <ReduxForm form="create-snapshot-form">
        {props => (
          <KeyValue
            method="create"
            input="input"
            type="snapshot"
            expanded
            onCancel={hideCreateSnapshot}
            handleSubmit={e =>
              handleActions(e, 'create', { name: 'test', id: machineID })}
            pristine={false}
            onlyName
            noDelete
          />
        )}
      </ReduxForm>
    ) : null;

  return (
    <div>
      {_loading}
      {_error}
      {_createSnapshot}
      {_table}
      {_footer}
    </div>
  );
};
