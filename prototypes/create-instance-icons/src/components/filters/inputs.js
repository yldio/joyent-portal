import React, { Component } from 'react';
import styled from 'styled-components';
import remcalc from 'remcalc';
import {
  FormGroup,
  FormLabel,
  Input,
  Select,
  Button,
  InputDropdown
} from 'joyent-ui-toolkit';
import { Row, Col } from 'react-styled-flexboxgrid';
import { Padding, Margin } from 'styled-components-spacing';

const RowFullWidth = styled(Row)`
  width: 100%;
`;

const Divider = styled.div`
  width: ${remcalc(1)};
  background: ${props => props.theme.grey};
  height: ${remcalc(66)};
  margin: 0 ${remcalc(14)};
  margin-bottom: ${remcalc(9)};
  display: flex;
  align-self: flex-end;
`;

const isToBeMultiplied = (name, state, target) =>
  (name === 'ram' && state[name][`${target}Selected`] === 'MB') ||
  (name === 'disk' && state[name][`${target}Selected`] === 'GB');

const valuesToSend = (changed, target, value) => ({
  min: !isNaN(parseFloat(changed.min)) ? parseFloat(changed.min) : 0,
  max: !isNaN(parseFloat(changed.max)) ? parseFloat(changed.max) : 0,
  [target]: parseFloat(value)
});

const ramLogic = ram => ({
  min: ram.min > 1 ? ram.min : ram.min * 1000,
  minSelected: 'MB',
  max: ram.max > 1 ? ram.max : ram.max * 1000,
  maxSelected: 'GB'
});

const diskLogic = disk => ({
  min: disk.min > 1 ? disk.min : disk.min * 1000,
  minSelected: 'GB',
  max: disk.max > 1 ? disk.max : disk.max * 1000,
  maxSelected: 'TB'
});

class Inputs extends Component {
  constructor(props) {
    super(props);
    const { filters: { cpu, cost, ram, disk }, reset } = this.props;

    this.state = {
      ram: ramLogic(ram),
      cpu,
      disk: diskLogic(disk),
      cost,
      reset
    };
  }

  componentWillReceiveProps = nextProps => {
    const { filters: { cpu, cost, ram, disk }, reset } = nextProps;
    if (reset !== this.state.reset) {
      this.setState({
        ram: ramLogic(ram),
        cpu,
        disk: diskLogic(disk),
        cost,
        reset
      });
    }
  };

  handleChange = (e, name, target) => {
    const changed = this.state[name];
    const value = (e.target || {}).value;

    setTimeout(() => {
      this.props[`${name}Change`](
        valuesToSend(
          {
            min: isToBeMultiplied(name, this.state, 'min')
              ? changed.min / 1000
              : changed.min,
            max: isToBeMultiplied(name, this.state, 'max')
              ? changed.max / 1000
              : changed.max
          },
          target,
          isToBeMultiplied(name, this.state, target) ? value / 1000 : value
        )
      );
    }, 1000);

    this.setState({
      ...this.state,
      [name]: {
        ...this.state[name],
        [target]: value
      }
    });
  };

  handleSelectChange = (e, name, target, valueTarget) => {
    const value = (e.target || {}).value;
    const isToBeMultiplied =
      (name === 'ram' && value === 'MB') || (name === 'disk' && value === 'GB');
    this.setState({
      ...this.state,
      [name]: {
        ...this.state[name],
        [target]: value
      }
    });

    this.props[`${name}Change`](
      valuesToSend(
        this.state[name],
        valueTarget,
        isToBeMultiplied
          ? this.state[name][valueTarget] / 1000
          : this.state[name][valueTarget]
      )
    );
  };

  handleBlur = (e, name, target) => {
    const changed = this.state[name];
    const value = (e.target || {}).value;

    this.props[`${name}Change`](
      valuesToSend(
        {
          min: isToBeMultiplied(name, this.state, 'min')
            ? changed.min / 1000
            : changed.min,
          max: isToBeMultiplied(name, this.state, 'max')
            ? changed.max / 1000
            : changed.max
        },
        target,
        isToBeMultiplied(name, this.state, target) ? value / 1000 : value
      )
    );

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
    const { onResetClick, disabled } = this.props;

    return [
      <Row bottom="xs">
        <Col>
          <Padding top={1}>
            <FormLabel>RAM</FormLabel>
          </Padding>
          <FormGroup flex center>
            <InputDropdown>
              <Input
                wrapped
                small
                type="text"
                onChange={e => this.handleChange(e, 'ram', 'min')}
                onBlur={e => this.handleBlur(e, 'ram', 'min')}
                value={ram.min}
              />
              <Select
                onChange={e =>
                  this.handleSelectChange(e, 'ram', 'minSelected', 'min')}
                value={ram.minSelected}
                wrapped
                fluid
              >
                <option value="MB">MB</option>
                <option value="GB">GB</option>
              </Select>
            </InputDropdown>
            <Padding horizontal={2}>to</Padding>
            <InputDropdown>
              <Input
                wrapped
                small
                type="text"
                onChange={e => this.handleChange(e, 'ram', 'max')}
                onBlur={e => this.handleBlur(e, 'ram', 'max')}
                value={ram.max}
              />
              <Select
                onChange={e =>
                  this.handleSelectChange(e, 'ram', 'maxSelected', 'max')}
                value={ram.maxSelected}
                wrapped
                fluid
              >
                <option value="MB">MB</option>
                <option value="GB">GB</option>
              </Select>
            </InputDropdown>
          </FormGroup>
        </Col>
        <Divider />
        <Col>
          <Padding top={1}>
            <FormLabel>Disk</FormLabel>
          </Padding>
          <FormGroup flex center>
            <InputDropdown>
              <Input
                wrapped
                small
                type="text"
                onChange={e => this.handleChange(e, 'disk', 'min')}
                onBlur={e => this.handleBlur(e, 'disk', 'min')}
                value={disk.min}
              />
              <Select
                onChange={e =>
                  this.handleSelectChange(e, 'disk', 'minSelected', 'min')}
                value={disk.minSelected}
                wrapped
                fluid
              >
                <option value="GB">GB</option>
                <option value="TB">TB</option>
              </Select>
            </InputDropdown>
            <Padding horizontal={2}>to</Padding>
            <InputDropdown>
              <Input
                wrapped
                small
                type="text"
                onChange={e => this.handleChange(e, 'disk', 'max')}
                onBlur={e => this.handleBlur(e, 'disk', 'max')}
                value={disk.max}
              />
              <Select
                onChange={e =>
                  this.handleSelectChange(e, 'disk', 'maxSelected', 'min')}
                value={disk.maxSelected}
                wrapped
                fluid
              >
                <option value="GB">GB</option>
                <option value="TB">TB</option>
              </Select>
            </InputDropdown>
          </FormGroup>
        </Col>
      </Row>,
      <RowFullWidth>
        <Col>
          <Padding top={1}>
            <FormLabel>vCPUs</FormLabel>
          </Padding>
          <FormGroup flex center>
            <Input
              small
              type="text"
              onChange={e => this.handleChange(e, 'cpu', 'min')}
              onBlur={e => this.handleBlur(e, 'cpu', 'min')}
              value={cpu.min}
            />
            <Padding horizontal={2}>to</Padding>
            <Input
              small
              type="text"
              onChange={e => this.handleChange(e, 'cpu', 'max')}
              onBlur={e => this.handleBlur(e, 'cpu', 'max')}
              value={cpu.max}
            />
          </FormGroup>
        </Col>
        <Divider />
        <Col>
          <Padding top={1}>
            <FormLabel>$/hour</FormLabel>
          </Padding>
          <FormGroup flex center>
            <Input
              small
              type="text"
              onChange={e => this.handleChange(e, 'cost', 'min')}
              onBlur={e => this.handleBlur(e, 'cost', 'min')}
              value={cost.min}
            />
            <Padding horizontal={2}>to</Padding>
            <Input
              small
              type="text"
              onChange={e => this.handleChange(e, 'cost', 'max')}
              onBlur={e => this.handleBlur(e, 'cost', 'max')}
              value={cost.max}
            />
          </FormGroup>
        </Col>
      </RowFullWidth>,
      <Row>
        <Col xs={12}>
          <Margin vertical={2}>
            <Button
              disabled={disabled}
              secondary
              small
              bold
              onClick={onResetClick}
            >
              Reset All Filters
            </Button>
          </Margin>
        </Col>
      </Row>
    ];
  }
}

export default Inputs;
