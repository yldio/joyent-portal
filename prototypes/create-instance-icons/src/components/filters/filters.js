import React, { Component } from 'react';
import isEqual from 'lodash.isequal';
import { reduxForm } from 'redux-form';
import { Margin } from 'styled-components-spacing';
import { Col, Row } from 'react-styled-flexboxgrid';
import { reset } from 'redux-form';
import remcalc from 'remcalc';
import styled from 'styled-components';
import { default as defaultState } from '@state/state';

import Inputs from './inputs';
import { returnIcon } from '../icons';

import {
  FormGroup,
  Checkbox,
  Label,
  H2,
  H4,
  P,
  ViewContainer
} from 'joyent-ui-toolkit';

const FullWidth = styled(Margin)`
  width: 100%;
,`;

const RowMargin = styled(Row)`
  margin-top: ${remcalc(-24)};
`;

class Filters extends Component {
  constructor(props) {
    super(props);
    const { filters: { cpu, cost, ram, disk } } = this.props;

    this.state = {
      ram,
      cpu,
      disk,
      cost
    };
  }

  handleResetClick = () => {
    const {
      dispatch,
      filterReset,
      filters: { cpu, cost, ram, disk }
    } = this.props;

    filterReset();
    dispatch(reset('type'));

    this.setState({
      ram,
      cpu,
      disk,
      cost
    });
  };

  render() {
    const {
      filters,
      ramChange,
      cpuChange,
      diskChange,
      costChange
    } = this.props;

    return [
      <Row>
        <Col xs={8}>
          <Margin bottom={6}>
            <H2>Package</H2>
          </Margin>
        </Col>
      </Row>,
      <RowMargin>
        <Col xs={8}>
          <P>
            A package defines the specs of your instance. On Triton, packages
            can only increase in size.{' '}
            <a href="https://docs.joyent.com/public-cloud/instances/packages/sizing">
              Read the docs
            </a>
          </P>
        </Col>
      </RowMargin>,
      <Row>
        <Col>
          <Margin vertical={2}>
            <H4>Filters</H4>
          </Margin>
        </Col>
      </Row>,
      <Row>
        {filters.groups
          .sort((a, b) => (a.name < b.name ? -1 : 1))
          .map((group, i) => (
            <Col>
              <FormGroup
                name={group.name}
                key={group.name}
                type="checkbox"
                reduxForm
              >
                <Checkbox>
                  {returnIcon(group.name)}
                  <Label>{group.name}</Label>
                </Checkbox>
              </FormGroup>
            </Col>
          ))}
      </Row>,
      <FullWidth top={2}>
        <Inputs
          ramChange={value => ramChange(value)}
          cpuChange={value => cpuChange(value)}
          diskChange={value => diskChange(value)}
          costChange={value => costChange(value)}
          filters={filters}
          disabled={isEqual(filters, defaultState.filters)}
          onClick={this.handleResetClick}
        />
      </FullWidth>
    ];
  }
}

export default reduxForm({ form: 'type' })(Filters);
