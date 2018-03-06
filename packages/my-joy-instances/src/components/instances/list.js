import React from 'react';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';
import remcalc from 'remcalc';
import styled from 'styled-components';
import titleCase from 'title-case';
import { Link } from 'react-router-dom';
import { Field } from 'redux-form';
import Flex from 'styled-flex-component';

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

import GLOBAL from '@state/global';

const stateColor = {
  PROVISIONING: 'primary',
  RUNNING: 'green',
  STOPPING: 'grey',
  STOPPED: 'grey',
  DELETED: 'secondaryActive',
  FAILED: 'red'
};

const A = styled(Anchor)`
  color: ${props => props.theme.text};
  text-decoration: none;
  font-weight: ${props => props.theme.font.weight.semibold};
`;

const ItemAnchor = styled(Anchor)`
  color: ${props => props.theme.text};
  -webkit-text-fill-color: currentcolor;
  text-decoration: none;
`;

const Actions = styled(Flex)`
  width: ${remcalc(48)};
  height: ${remcalc(48)};
  min-width: ${remcalc(48)};
`;

export const Item = ({
  id = '',
  name,
  state = 'RUNNING',
  created,
  allowedActions = {},
  mutating = false,
  onCreateImage,
  onStart,
  onStop,
  onReboot,
  onRemove,
  onClick
}) => (
  <TableTr>
    <TableTd padding="0" paddingLeft={remcalc(12)} middle left>
      <FormGroup name={id} paddingTop={remcalc(4)} field={Field}>
        <Checkbox noMargin />
      </FormGroup>
    </TableTd>
    <TableTd middle left>
      <A to={`/instances/${name}`} component={Link}>
        {name}
      </A>
    </TableTd>
    <TableTd middle left>
      {mutating ? (
        <StatusLoader small />
      ) : (
        <span>
          <DotIcon size={remcalc(12)} color={stateColor[state]} />{' '}
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
            <Actions alignCenter justifyCenter>
              <ActionsIcon />
            </Actions>
          </PopoverTarget>
          <Popover placement="bottom">
            <PopoverItem disabled={!allowedActions.start} onClick={onStart}>
              Start
            </PopoverItem>
            <PopoverItem disabled={!allowedActions.stop} onClick={onStop}>
              Stop
            </PopoverItem>
            <PopoverItem disabled={!allowedActions.reboot} onClick={onReboot}>
              Reboot
            </PopoverItem>
            <PopoverDivider />
            <PopoverItem disabled={false} onClick={onCreateImage}>
              <ItemAnchor
                href={`${GLOBAL.origin}/images/~create/${name}`}
                target="__blank"
                rel="noopener noreferrer"
              >
                Create Image
              </ItemAnchor>
            </PopoverItem>
            <PopoverDivider />
            <PopoverItem disabled={!allowedActions.remove} onClick={onRemove}>
              Remove
            </PopoverItem>
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
  children,
  noInstances
}) => (
  <form>
    <Table>
      <TableThead>
        <TableTr>
          <TableTh xs="32" padding="0" paddingLeft={remcalc(12)} middle left>
            <FormGroup paddingTop={remcalc(4)}>
              <Checkbox
                checked={allSelected}
                disabled={submitting || noInstances}
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
