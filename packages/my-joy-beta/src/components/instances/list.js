import React from 'react';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';
import Value from 'react-redux-values';
import remcalc from 'remcalc';
import titleCase from 'title-case';

import {
  Row,
  Col,
  Anchor,
  FormGroup,
  Input,
  FormLabel,
  Checkbox,
  Button,
  Table,
  TableThead,
  TableTr,
  TableTh,
  TableTd,
  TableTbody,
  Footer,
  StatusLoader,
  Message,
  MessageTitle,
  MessageDescription,
  Popover,
  PopoverContainer,
  PopoverTarget,
  PopoverItem,
  PopoverDivider,
  QueryBreakpoints,
  DotIcon,
  StartIcon,
  StopIcon,
  ResetIcon,
  DeleteIcon,
  ActionsIcon
} from 'joyent-ui-toolkit';

const { SmallOnly, Medium } = QueryBreakpoints;

const stateColor = {
  PROVISIONING: 'primary',
  RUNNING: 'green',
  STOPPING: 'grey',
  STOPPED: 'grey',
  DELETED: 'secondaryActive',
  FAILED: 'red'
};

export const MenuForm = ({ handleSubmit, searchable }) => (
  <form onSubmit={handleSubmit}>
    <Row>
      <Col xs={7} sm={5}>
        <FormGroup name="filter" fluid reduxForm>
          <FormLabel>Filter instances</FormLabel>
          <Input
            placeholder="Search for name, state, tags, etc..."
            disabled={!searchable}
            fluid
          />
        </FormGroup>
      </Col>
      <Col xs={5} sm={7}>
        <FormGroup right>
          <FormLabel>&#8291;</FormLabel>
          <Button type="submit" small icon fluid>
            Create Instance
          </Button>
        </FormGroup>
      </Col>
    </Row>
  </form>
);

export const Actions = ({
  submitting = false,
  allowedActions = {},
  onStart = () => null,
  onStop = () => null,
  onReboot = () => null,
  onDelete = () => null
}) => (
  <Footer fixed bottom>
    <Row between="xs" middle="xs">
      <Col xs={7}>
        <Value name="instance-list-starting">
          {({ value: starting }) => [
            <SmallOnly key="small-only">
              <Button
                type="button"
                onClick={onStart}
                disabled={submitting || !allowedActions.start}
                loading={submitting && starting}
                secondary
                small
                icon
                rect
              >
                <StartIcon disabled={submitting || !allowedActions.start} />
              </Button>
            </SmallOnly>,
            <Medium key="medium">
              <Button
                type="button"
                onClick={onStart}
                disabled={submitting || !allowedActions.start}
                loading={submitting && starting}
                secondary
                icon
                rect
              >
                <StartIcon disabled={submitting || !allowedActions.start} />
                <span>Start</span>
              </Button>
            </Medium>
          ]}
        </Value>
        <Value name="instance-list-stoping">
          {({ value: stoping }) => [
            <SmallOnly key="small-only">
              <Button
                type="button"
                onClick={onStop}
                disabled={submitting || !allowedActions.stop}
                loading={submitting && stoping}
                secondary
                small
                icon
                rect
              >
                <StopIcon disabled={submitting || !allowedActions.stop} />
              </Button>
            </SmallOnly>,
            <Medium key="medium">
              <Button
                type="button"
                onClick={onStop}
                disabled={submitting || !allowedActions.stop}
                loading={submitting && stoping}
                secondary
                icon
                rect
              >
                <StopIcon disabled={submitting || !allowedActions.stop} />
                <span>Stop</span>
              </Button>
            </Medium>
          ]}
        </Value>
        <Value name="instance-list-restarting">
          {({ value: restarting }) => [
            <SmallOnly key="small-only">
              <Button
                type="button"
                onClick={onReboot}
                disabled={submitting || !allowedActions.reboot}
                loading={submitting && restarting}
                secondary
                small
                icon
                rect
              >
                <ResetIcon disabled={submitting || !allowedActions.reboot} />
              </Button>
            </SmallOnly>,
            <Medium key="medium">
              <Button
                type="button"
                onClick={onReboot}
                disabled={submitting || !allowedActions.reboot}
                loading={submitting && restarting}
                secondary
                icon
                rect
              >
                <ResetIcon disabled={submitting || !allowedActions.reboot} />
                <span>Reboot</span>
              </Button>
            </Medium>
          ]}
        </Value>
      </Col>
      <Col xs={5}>
        <Value name="instance-list-deleting">
          {({ value: deleting }) => [
            <SmallOnly key="small-only">
              <Button
                type="button"
                onClick={onDelete}
                disabled={submitting}
                loading={submitting && deleting}
                secondary
                right
                small
                icon
                rect
              >
                <DeleteIcon disabled={submitting} />
              </Button>
            </SmallOnly>,
            <Medium key="medium">
              <Button
                type="button"
                onClick={onDelete}
                disabled={submitting}
                loading={submitting && deleting}
                secondary
                right
                icon
                rect
              >
                <DeleteIcon disabled={submitting} />
                <span>Delete</span>
              </Button>
            </Medium>
          ]}
        </Value>
      </Col>
    </Row>
  </Footer>
);

export const Item = ({
  id = '',
  name,
  state,
  created,
  allowedActions = {},
  submitting,
  onStart,
  onStop,
  onReboot,
  onDelete
}) => (
  <TableTr>
    <TableTd padding="0" paddingLeft={remcalc(12)} middle left>
      <FormGroup name={id} paddingTop={remcalc(4)} reduxForm>
        <Checkbox />
      </FormGroup>
    </TableTd>
    <TableTd middle left>
      <Anchor to={`/instances/${name}`}>{name}</Anchor>
    </TableTd>
    <TableTd middle left>
      <Value name={`${id}-mutating`}>
        {({ value: mutating }) =>
          mutating ? (
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
          )
        }
      </Value>
    </TableTd>
    <TableTd xs="0" sm="160" middle left>
      {distanceInWordsToNow(created)}
    </TableTd>
    <TableTd xs="0" sm="130" middle left>
      <code>{id.substring(0, 7)}</code>
    </TableTd>
    <PopoverContainer clickable>
      <TableTd padding="0" hasBorder="left">
        <PopoverTarget box>
          <ActionsIcon />
        </PopoverTarget>
        <Popover placement="right">
          <PopoverItem
            disabled={!allowedActions.start}
            onClick={() => onStart({ id })}
          >
            Start
          </PopoverItem>
          <PopoverItem
            disabled={!allowedActions.stop}
            onClick={() => onStop({ id })}
          >
            Stop
          </PopoverItem>
          <PopoverItem onClick={() => onReboot({ id })}>Reboot</PopoverItem>
          <PopoverDivider />
          <PopoverItem onClick={() => onDelete({ id })}>Delete</PopoverItem>
        </Popover>
      </TableTd>
    </PopoverContainer>
  </TableTr>
);

export default ({
  items = [],
  allowedActions = {},
  sortBy = 'name',
  sortOrder = 'desc',
  error = null,
  submitting = false,
  actionable = false,
  allSelected = false,
  toggleSelectAll = () => null,
  onStart = () => null,
  onStop = () => null,
  onReboot = () => null,
  onDelete = () => null,
  onSortBy = () => null
}) => (
  <form>
    {error ? (
      <Message error>
        <MessageTitle>Ooops!</MessageTitle>
        <MessageDescription>{error}</MessageDescription>
      </Message>
    ) : null}
    <Table>
      <TableThead>
        <TableTr>
          <TableTh xs="32" padding="0" paddingLeft={remcalc(12)} middle left>
            <FormGroup paddingTop={remcalc(4)}>
              <Checkbox
                checked={allSelected}
                disabled={submitting}
                onChange={toggleSelectAll}
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
      <TableTbody>
        {items.map(({ id, ...rest }) => (
          <Item
            key={id}
            id={id}
            {...rest}
            submitting={submitting}
            onStart={onStart}
            onStop={onStop}
            onReboot={onReboot}
            onDelete={onDelete}
          />
        ))}
      </TableTbody>
    </Table>
    {actionable ? (
      <Actions
        allowedActions={allowedActions}
        submitting={submitting}
        onStart={onStart}
        onStop={onStop}
        onReboot={onReboot}
        onDelete={onDelete}
      />
    ) : null}
  </form>
);
