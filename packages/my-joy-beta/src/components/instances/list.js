import React from 'react';
import { Row, Col } from 'react-styled-flexboxgrid';
import forceArray from 'force-array';
import get from 'lodash.get';

import {
  FormGroup,
  Input,
  FormLabel,
  ViewContainer,
  StatusLoader,
  Select
} from 'joyent-ui-toolkit';

import Item from './item';

export default ({
  instances = [],
  selected = [],
  loading,
  handleChange = () => null,
  onAction = () => null,
  handleSubmit,
  ...rest
}) => {
  const allowedActions = {
    stop: selected.some(({ state }) => state === 'RUNNING'),
    start: selected.some(({ state }) => state !== 'RUNNING'),
    reboot: true,
    resize:
      selected.length === 1 && selected.every(({ brand }) => brand === 'KVM'),
    enableFw: selected.some(({ firewall_enabled }) => !firewall_enabled),
    disableFw: selected.some(({ firewall_enabled }) => firewall_enabled),
    createSnap: true,
    startSnap:
      selected.length === 1 &&
      selected.every(({ snapshots = [] }) => snapshots.length)
  };

  const handleActions = ({ target }) =>
    onAction({
      name: target.value,
      items: selected
    });

  const _instances = forceArray(instances);

  const items = _instances.map((instance, i, all) => (
    <Item
      key={instance.id}
      {...instance}
      last={all.length - 1 === i}
      first={!i}
    />
  ));

  const _loading =
    !items.length && loading ? (
      <ViewContainer center>
        <StatusLoader />
      </ViewContainer>
    ) : null;

  return (
    <form
      onChange={() => handleSubmit(ctx => handleChange(ctx))}
      onSubmit={handleSubmit}
    >
      <Row between="xs">
        <Col xs={10} sm={8} lg={6}>
          <Row>
            <Col xs={7} sm={7} md={6} lg={6}>
              <FormGroup name="filter" reduxForm>
                <FormLabel>Filter instances</FormLabel>
                <Input
                  placeholder="Search for name, state, tags, etc..."
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
        <Col xs={2} sm={4} lg={6}>
          <Row end="xs">
            <Col xs={12} sm={3} md={3} lg={2}>
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
          </Row>
        </Col>
      </Row>
      {_loading}
      {items}
    </form>
  );
};
