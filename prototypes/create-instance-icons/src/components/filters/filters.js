import React, { Component } from 'react';
import styled from 'styled-components';
import remcalc from 'remcalc';
import isEqual from 'lodash.isequal';
import { reduxForm } from 'redux-form';
import { Margin } from 'styled-components-spacing';
import { Col, Row } from 'react-styled-flexboxgrid';
import { reset } from 'redux-form';
import {
  Button,
  FormGroup,
  Checkbox,
  Label,
  H2,
  H5,
  ViewContainer
} from 'joyent-ui-toolkit';
import { default as defaultState } from '@state/state';
import Inputs from './inputs';
import { returnIcon } from '../icons';

const FilterWrapper = styled.section`
  display: flex;
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
      <ViewContainer>
        <Row>
          <Margin bottom={6}>
            <H2>Package</H2>
          </Margin>
        </Row>
      </ViewContainer>,
      <ViewContainer>
        <Row>
          <H5>Filter by package type</H5>
        </Row>
      </ViewContainer>,
      <Row style={{ width: '100%', margin: 0 }}>
        {filters.groups
          .sort((a, b) => (a.name < b.name ? -1 : 1))
          .map((group, i) => (
            <Col xs={6} md={3} xsOffset={i === 2 ? 4 : 0}>
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
      <Margin bottom={1}>
        <H5>Filter by package feature</H5>
      </Margin>,
      <FilterWrapper>
        <Inputs
          ramChange={value => ramChange(value)}
          cpuChange={value => cpuChange(value)}
          diskChange={value => diskChange(value)}
          costChange={value => costChange(value)}
          filters={filters}
        />
      </FilterWrapper>,
      <Row>
        <Button
          disabled={isEqual(filters, defaultState.filters)}
          secondary
          small
          bold
          onClick={this.handleResetClick}
        >
          Reset All Filters
        </Button>
      </Row>
    ];
  }
}

export default reduxForm({ form: 'type' })(Filters);
