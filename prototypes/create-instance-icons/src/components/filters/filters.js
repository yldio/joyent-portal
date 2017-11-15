import React, { Component } from 'react';
import styled from 'styled-components';
import isEqual from 'lodash.isequal';
import { reduxForm } from 'redux-form';
import { Margin } from 'styled-components-spacing';
import { Col, Row } from 'react-styled-flexboxgrid';
import { reset } from 'redux-form';
import { default as defaultState } from '@state/state';

import Inputs from './inputs';
import { returnIcon } from '../icons';

import {
  FormGroup,
  Checkbox,
  Label,
  H2,
  H5,
  ViewContainer
} from 'joyent-ui-toolkit';

const FilterWrapper = styled.section`
  display: flex;
  width: 100%;
`;

const ColStyled = styled(Col)`
  &:nth-child(3) {
    display: none;
  }
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
            <ColStyled xs={6} md={3}>
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
            </ColStyled>
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
          disabled={isEqual(filters, defaultState.filters)}
          onClick={this.handleResetClick}
        />
      </FilterWrapper>
    ];
  }
}

export default reduxForm({ form: 'type' })(Filters);
