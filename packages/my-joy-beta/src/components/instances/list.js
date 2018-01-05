import React from 'react';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';
import remcalc from 'remcalc';
import titleCase from 'title-case';
import { Link } from 'react-router-dom';
import { Field } from 'redux-form';

import {
  Anchor,
  FormGroup,
  Checkbox,
  Table,
  TableThead,
  TableTr,
  TableTh,
  TableTd,
  TableTbody,
  StatusLoader,
  Popover,
  PopoverContainer,
  PopoverTarget,
  PopoverItem,
  PopoverDivider,
  DotIcon,
  ActionsIcon
} from 'joyent-ui-toolkit';

const stateColor = {
  PROVISIONING: 'primary',
  RUNNING: 'green',
  STOPPING: 'grey',
  STOPPED: 'grey',
  DELETED: 'secondaryActive',
  FAILED: 'red'
};

export const Item = ({
  id = '',
  name,
  state = 'RUNNING',
  created,
  allowedActions = {},
  mutating = false,
  onStart,
  onStop,
  onReboot,
  onDelete
}) => (
  <TableTr>
    <TableTd padding="0" paddingLeft={remcalc(12)} middle left>
      <FormGroup name={id} paddingTop={remcalc(4)} field={Field}>
        <Checkbox noMargin />
      </FormGroup>
    </TableTd>
    <TableTd middle left>
      <Anchor to={`/instances/${name}`} component={Link}>
        {name}
      </Anchor>
    </TableTd>
    <TableTd middle left>
      {mutating ? (
        <StatusLoader small />
      ) : (
        <span>
          <DotIcon
            width={remcalc(11)}
            height={remcalc(11)}
            borderRadius={remcalc(11)}
            color={stateColor[state]}
          />{' '}
          {titleCase(state)}
        </span>
      )}
    </TableTd>
    <TableTd xs="0" sm="160" middle left>
      {distanceInWordsToNow(created)}
    </TableTd>
    <TableTd xs="0" sm="130" middle left>
      <code>{id.substring(0, 7)}</code>
    </TableTd>
    {!mutating ? (
      <PopoverContainer clickable>
        <TableTd padding="0" hasBorder="left">
          <PopoverTarget box>
            <ActionsIcon />
          </PopoverTarget>
          <Popover placement="top">
            <PopoverItem disabled={!allowedActions.start} onClick={onStart}>
              Start
            </PopoverItem>
            <PopoverItem disabled={!allowedActions.stop} onClick={onStop}>
              Stop
            </PopoverItem>
            <PopoverItem onClick={onReboot}>Reboot</PopoverItem>
            <PopoverDivider />
            <PopoverItem onClick={onDelete}>Delete</PopoverItem>
          </Popover>
        </TableTd>
      </PopoverContainer>
    ) : (
      <TableTd padding="0" hasBorder="left" center middle>
        <ActionsIcon disabled />
      </TableTd>
    )}
  </TableTr>
);

export default ({
  sortBy = 'name',
  sortOrder = 'desc',
  submitting = false,
  allSelected = false,
  toggleSelectAll = () => null,
  onSortBy = () => null,
  children
}) => (
  <form>
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
            onClick={() => onSortBy('name')}
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
            onClick={() => onSortBy('state')}
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
            onClick={() => onSortBy('created')}
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
            sm="130"
            onClick={() => onSortBy('id')}
            sortOrder={sortOrder}
            showSort={sortBy === 'id'}
            left
            middle
            actionable
          >
            <span>Short ID </span>
          </TableTh>
          <TableTh xs="60" padding="0" />
        </TableTr>
      </TableThead>
      <TableTbody>{children}</TableTbody>
    </Table>
  </form>
);
