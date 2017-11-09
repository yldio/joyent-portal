import React, { Component } from 'react';
import { FormGroup, FormLabel, Input } from 'joyent-ui-toolkit';
import { Row, Col } from 'react-styled-flexboxgrid';
import { Padding } from 'styled-components-spacing';
import styled from 'styled-components';
import remcalc from 'remcalc';

const GrowRow = styled(Row)`
  flex-grow: 1;
`;
const returnValue = (value, name, start) => {
  let ramValue = isToBeDived(value, name)
    ? `${value / 1000} GB`
    : `${value} MB`;
  let diskValue = isToBeDived(value, name)
    ? `${value / 1000} TB`
    : `${value} GB`;

  if (start) {
    ramValue = value > 1 ? `${value} GB` : `${value * 1000} MB`;
    diskValue = value > 1 ? `${value} TB` : `${value * 1000} GB`;
  }

  if (name === 'ram' || name === 'disk') {
    return name === 'ram' ? ramValue : diskValue;
  }

  return value || 0;
};

const isToBeDived = (value, name) =>
  (name === 'ram' &&
    value &&
    value
      .toString()
      .toLowerCase()
      .includes('mb')) ||
  (name === 'disk' &&
    value &&
    value
      .toString()
      .toLowerCase()
      .includes('gb'));

const cleanValues = (changed, name) =>
  Object.keys(changed).map((key, index) => {
    const stringify = changed[key].toString().toLowerCase();

    let value =
      stringify.includes('gb') ||
      stringify.includes('mb') ||
      stringify.includes('tb')
        ? changed[key].split(/[a-zA-Z ]+/g)[0]
        : changed[key];

    if (isToBeDived(stringify, name)) {
      value /= 1000;
    }

    return value;
  });

const int = num => parseFloat(num);

const valuesToSend = (changed, target, value, name) => {
  const values = cleanValues(changed, name);

  return {
    min: !isNaN(int(values[0])) ? int(values[0]) : 0,
    max: !isNaN(int(values[1])) ? int(values[1]) : 0,
    [target]: !isNaN(int(value))
      ? isToBeDived(value, name) ? int(value) / 1000 : int(value)
      : 0
  };
};

class Inputs extends Component {
  constructor(props) {
    super(props);
    const { filters: { cpu, cost, ram, disk } } = this.props;

    this.state = {
      ram: {
        min: returnValue(ram.min, 'ram', true),
        max: returnValue(ram.max, 'ram', true)
      },
      cpu,
      disk: {
        min: returnValue(disk.min, 'disk', true),
        max: returnValue(disk.max, 'disk', true)
      },
      cost
    };
  }

  handleChange = (e, name, target) => {
    const changed = this.state[name];
    const value = (e.target || {}).value;

    setTimeout(() => {
      this.props[`${name}Change`](valuesToSend(changed, target, value, name));
    }, 1000);

    this.setState({
      ...this.state,
      [name]: {
        ...this.state[name],
        [target]: value
      }
    });
  };

  handleBlur = (e, name, target) => {
    const changed = this.state[name];
    const value = (e.target || {}).value;

    this.props[`${name}Change`](valuesToSend(changed, target, value, name));

    this.setState({
      ...this.state,
      [name]: {
        ...this.state[name],
        [target]: value
      }
    });
  };

  render() {
    const { cpu, cost, ram, disk } = this.state;
    return (
      <GrowRow between="xs">
        <Col>
          <FormLabel>RAM</FormLabel>
          <FormGroup flex>
            <Input
              small
              type="text"
              onChange={e => this.handleChange(e, 'ram', 'min')}
              onBlur={e => this.handleBlur(e, 'ram', 'min')}
              value={ram.min}
            />
            <Padding horizontal={2}>to</Padding>
            <Input
              small
              type="text"
              onChange={e => this.handleChange(e, 'ram', 'max')}
              onBlur={e => this.handleBlur(e, 'ram', 'max')}
              value={ram.max}
            />
          </FormGroup>
        </Col>
        <Col>
          <FormLabel>Disk</FormLabel>
          <FormGroup flex>
            <Input
              small
              type="text"
              onChange={e => this.handleChange(e, 'disk', 'min')}
              onBlur={e => this.handleBlur(e, 'disk', 'min')}
              value={disk.min}
            />
            <Padding horizontal={2}>to</Padding>
            <Input
              small
              type="text"
              onChange={e => this.handleChange(e, 'disk', 'max')}
              onBlur={e => this.handleBlur(e, 'disk', 'max')}
              value={disk.max}
            />
          </FormGroup>
        </Col>
        <Col>
          <FormLabel>vCPUs</FormLabel>
          <FormGroup flex>
            <Input
              xSmall
              type="text"
              onChange={e => this.handleChange(e, 'cpu', 'min')}
              onBlur={e => this.handleBlur(e, 'cpu', 'min')}
              value={cpu.min}
            />
            <Padding horizontal={2}>to</Padding>
            <Input
              xSmall
              type="text"
              onChange={e => this.handleChange(e, 'cpu', 'max')}
              onBlur={e => this.handleBlur(e, 'cpu', 'max')}
              value={cpu.max}
            />
          </FormGroup>
        </Col>
        <Col>
          <FormLabel>$/hour</FormLabel>
          <FormGroup flex>
            <Input
              xSmall
              type="text"
              onChange={e => this.handleChange(e, 'cost', 'min')}
              onBlur={e => this.handleBlur(e, 'cost', 'min')}
              value={cost.min}
            />
            <Padding horizontal={2}>to</Padding>
            <Input
              xSmall
              type="text"
              onChange={e => this.handleChange(e, 'cost', 'max')}
              onBlur={e => this.handleBlur(e, 'cost', 'max')}
              value={cost.max}
            />
          </FormGroup>
        </Col>
      </GrowRow>
    );
  }
}

export default Inputs;
