import React from 'react';
import { Row, Col } from 'react-styled-flexboxgrid';
import forceArray from 'force-array';
import find from 'lodash.find';
import moment from 'moment';

import {
  FormGroup,
  Input,
  FormLabel,
  ViewContainer,
  StatusLoader,
  Select,
  Message,
  MessageTitle,
  MessageDescription,
  Button,
  QueryBreakpoints,
  Table,
  TableThead,
  TableTr,
  TableTh,
  TableTbody,
  TableTd,
  Checkbox,
  P
} from 'joyent-ui-toolkit';

const { SmallOnly, Medium } = QueryBreakpoints;

const Item = ({ name, state, created }) => (
  <TableTr>
    <TableTd center middle>
      <FormGroup name={name} reduxForm>
        <Checkbox />
      </FormGroup>
    </TableTd>
    <TableTd>{name}</TableTd>
    <TableTd>{moment.unix(created).fromNow()}</TableTd>
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
  pristine = true,
  ...rest
}) => {
  const allowedActions = {
    delete: selected.length > 0,
    start: selected.length === 1
  };

  const handleActions = ev => {
    ev.stopPropagation();
    ev.preventDefault();

    onAction({
      name: ev.target.value,
      items: selected
    });
  };

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

  const _table = !items.length ? null : (
    <Table>
      <TableThead>
        <TableTr>
          <TableTh xs="48" />
          <TableTh left bottom>
            <P>Name</P>
          </TableTh>
          <TableTh xs="120" left bottom>
            <P>Created</P>
          </TableTh>
        </TableTr>
      </TableThead>
      <TableTbody>{items.map(snapshot => <Item key={snapshot.name} {...snapshot} />)}</TableTbody>
    </Table>
  );

  return (
    <form
      onChange={() => handleSubmit(ctx => handleChange(ctx))}
      onSubmit={handleSubmit}
    >
      <Row between="xs">
        <Col xs={8} sm={8} lg={6}>
          <Row>
            <Col xs={7} sm={7} md={6} lg={6}>
              <FormGroup name="filter" reduxForm>
                <FormLabel>Filter snapshots</FormLabel>
                <Input
                  placeholder="Search for name or state"
                  disabled={pristine && !items.length}
                  fluid
                />
              </FormGroup>
            </Col>
            <Col xs={5} sm={3} lg={3}>
              <FormGroup name="sort" reduxForm>
                <FormLabel>Sort</FormLabel>
                <Select disabled={!items.length} fluid>
                  <option value="name">Name</option>
                  <option value="state">State</option>
                  <option value="created">Created</option>
                  <option value="updated">Updated</option>
                </Select>
              </FormGroup>
            </Col>
          </Row>
        </Col>
        <Col xs={4} sm={4} lg={6}>
          <Row end="xs">
            <Col xs={6} sm={4} md={3} lg={2}>
              <FormGroup>
                <FormLabel>&#8291;</FormLabel>
                <Select
                  value="actions"
                  disabled={!items.length || !selected.length}
                  onChange={handleActions}
                  fluid
                >
                  <option value="actions" selected disabled>
                    &#8801;
                  </option>
                  <option value="delete" disabled={!allowedActions.delete}>
                    Delete
                  </option>
                  <option value="start" disabled={!allowedActions.start}>
                    Start
                  </option>
                </Select>
              </FormGroup>
            </Col>
            <Col xs={6} sm={6} md={5} lg={2}>
              <FormGroup>
                <FormLabel>&#8291;</FormLabel>
                <Button
                  type="button"
                  small
                  icon
                  fluid
                  onClick={() => onAction({ name: 'create' })}
                >
                  <SmallOnly>+</SmallOnly>
                  <Medium>Create</Medium>
                </Button>
              </FormGroup>
            </Col>
          </Row>
        </Col>
      </Row>
      {_loading}
      {_error}
      {_table}
    </form>
  );
};
