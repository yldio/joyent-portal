import React from 'react';
import { Row, Col } from 'react-styled-flexboxgrid';
import forceArray from 'force-array';
import find from 'lodash.find';

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
  QueryBreakpoints
} from 'joyent-ui-toolkit';

import Item from './item';

const { SmallOnly, Medium } = QueryBreakpoints;

export default ({
  instances = [],
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
    stop: selected.some(({ state }) => state === 'RUNNING'),
    start: selected.some(({ state }) => state !== 'RUNNING'),
    reboot: true,
    resize:
      selected.length === 1 && selected.every(({ brand }) => brand === 'KVM'),
    // eslint-disable-next-line camelcase
    enableFw: selected.some(({ firewall_enabled }) => !firewall_enabled),
    // eslint-disable-next-line camelcase
    disableFw: selected.some(({ firewall_enabled }) => firewall_enabled),
    createSnap: selected.length === 1,
    startSnap:
      selected.length === 1 &&
      selected.every(({ snapshots = [] }) => snapshots.length)
  };

  const handleActions = ev => {
    ev.stopPropagation();
    ev.preventDefault();

    onAction({
      name: ev.target.value,
      items: selected
    });
  };

  const _instances = forceArray(instances);

  const items = _instances.map((instance, i, all) => {
    const { id } = instance;

    const isSelected = Boolean(find(selected, ['id', id]));
    const isSubmitting = isSelected && submitting;

    return (
      <Item
        key={id}
        {...instance}
        last={all.length - 1 === i}
        first={!i}
        loading={isSubmitting}
      />
    );
  });

  const _loading =
    !items.length && loading ? (
      <ViewContainer center>
        <StatusLoader />
      </ViewContainer>
    ) : null;

  const _error = error &&
    !submitting && (
      <Message error>
        <MessageTitle>Ooops!</MessageTitle>
        <MessageDescription>{error}</MessageDescription>
      </Message>
    );

  return (
    <form>
      <Row between="xs">
        <Col xs={8} sm={8} lg={6}>
          <Row>
            <Col xs={7} sm={7} md={6} lg={6}>
              <FormGroup name="filter" reduxForm>
                <FormLabel>Filter instances</FormLabel>
                <Input
                  placeholder="Search for name, state, tags, etc..."
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
                  <option value="primary_ip">IP</option>
                  <option value="image.name">Image</option>
                  <option value="firewall_enabled">Firewall</option>
                  <option value="created">Created</option>
                  <option value="updated">Updated</option>
                  <option value="brand">Brand</option>
                  <option value="memory">Memory</option>
                  <option value="disk">Disk</option>
                  <option value="package.name">Package</option>
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
                  <option value="stop" disabled={!allowedActions.stop}>
                    Stop
                  </option>
                  <option value="start" disabled={!allowedActions.start}>
                    Start
                  </option>
                  <option value="reboot" disabled={!allowedActions.reboot}>
                    Reboot
                  </option>
                  <option value="resize" disabled={!allowedActions.resize}>
                    Resize
                  </option>
                  <option value="enableFw" disabled={!allowedActions.enableFw}>
                    Enable Firewall
                  </option>
                  <option
                    value="disableFw"
                    disabled={!allowedActions.disableFw}
                  >
                    Disable Firewall
                  </option>
                  <option
                    value="createSnap"
                    disabled={!allowedActions.createSnap}
                  >
                    Create Snapshot
                  </option>
                  <option
                    value="startSnap"
                    disabled={!allowedActions.startSnap}
                  >
                    Start from Snapshot
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
      {items}
    </form>
  );
};
