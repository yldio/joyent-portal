import React, { Component } from 'react';
import styled from 'styled-components';
import remcalc from 'remcalc';
import isEqual from 'lodash.isequal';
import { reduxForm } from 'redux-form';
import { Col, Row } from 'react-styled-flexboxgrid';
import {
  Button,
  FormGroup,
  Checkbox,
  Label,
  H2,
  H5
} from 'joyent-ui-toolkit';
import { default as defaultState } from '@state/state';
import Inputs from './inputs';
import { returnIcon } from '../icons';

const FilterWrapper = styled.section`
  display: flex;

  > div {
    flex-grow: 1;

    &:not(:last-child) {
      margin-right: ${remcalc(36)};
    }
  }
`;

const FormStyled = styled.form`
  display: flex;
  align-items: center;
  width: 100%;
`;

const Wrapper = styled.section`
  /* Comment for prettier */
  width: 100%;
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
    const { filterReset, filters: { cpu, cost, ram, disk } } = this.props;

    filterReset();

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
        <Wrapper><H2>Package</H2></Wrapper>,
        <Wrapper><H5>Filter by package type</H5></Wrapper>,
        <Row middle="xs">
        <Col xs={11}>
          <FormStyled>
            {filters.groups
              .sort((a, b) => (a.name < b.name ? -1 : 1))
              .map(group => (
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
              ))}
          </FormStyled>
          </Col>
          <Col xs={1}>
          <Button
            disabled={isEqual(filters, defaultState.filters)}
            secondary
            small
            onClick={this.handleResetClick}
          >
            Reset Filters
          </Button>
          </Col>
        </Row>,
        <H5>Filter by package feature</H5>,
        <FilterWrapper>
          <Inputs
            ramChange={value => ramChange(value)}
            cpuChange={value => cpuChange(value)}
            diskChange={value => diskChange(value)}
            costChange={value => costChange(value)}
            filters={filters}
          />
        </FilterWrapper>
    ];
  }
}

export default reduxForm({ form: 'type' })(Filters);
