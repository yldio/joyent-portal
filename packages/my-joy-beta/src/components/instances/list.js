import React from 'react';
import { Row, Col } from 'react-styled-flexboxgrid';
import forceArray from 'force-array';

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
  instances,
  loading,
  handleChange = () => null,
  onAction = () => null,
  handleSubmit,
  ...rest
}) => {
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
                <Select disabled={!items.length}>
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
                  disabled={!items.length}
                  onChange={({ target }) => onAction(target.value)}
                >
                  <option value="actions" selected disabled>
                    &#8801;
                  </option>
                  <option value="stop">Stop</option>
                  <option value="start">Start</option>
                  <option value="reboot">Reboot</option>
                  <option value="resize">Resize</option>
                  <option value="enable-fw">Enable Firewall</option>
                  <option value="disable-fw">Disable Firewall</option>
                  <option value="create-snap">Create Snapshot</option>
                  <option value="start-snap">Start from Snapshot</option>
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
