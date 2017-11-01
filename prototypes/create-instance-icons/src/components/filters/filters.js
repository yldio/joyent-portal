import React, { Component } from 'react';
import styled from 'styled-components';
import remcalc from 'remcalc';
import isEqual from 'lodash.isequal';
import { reduxForm } from 'redux-form';
import {
  Button,
  FormGroup,
  Checkbox,
  CheckboxList,
  Label,
  H2,
  H5
} from 'joyent-ui-toolkit';
import { default as defaultState } from '@state/state';
import Sliders from './sliders';
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

const GroupWrapper = styled.section`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: ${remcalc(18)};
`;

const Wrapper = styled.section`
  /* Comment for prettier */
  width: 100%;
`;

const CheckboxListContainer = styled(CheckboxList)`
  display: flex;
  width: 100%;
`;

class Filters extends Component {
  constructor(props) {
    super(props);
    const { filters: { cpu, cost, ram, disk } } = this.props;

    this.state = {
      reset: 0,
      ram,
      cpu,
      disk,
      cost,
      groupClick: 0,
      defaults: this.props.filters
    };
  }

  groupChange = group => {
    const { groupChange } = this.props;
    groupChange(group);

    this.setState({
      groupClick: this.state.groupClick + 1
    });
  };

  handleResetClick = () => {
    const { filterReset, filters: { cpu, cost, ram, disk } } = this.props;
    const { reset } = this.state;
    filterReset();

    this.setState({
      reset: reset + 1,
      ram,
      cpu,
      disk,
      cost
    });
  };

  render() {
    const {
      filters,
      ramSliderChange,
      cpuSliderChange,
      diskSliderChange,
      costSliderChange,
      packages,
      handleSubmit
    } = this.props;

    const { reset, defaults, groupClick } = this.state;

    return (
      <Wrapper>
        <H2>Package</H2>
        <H5>Filter by package type</H5>
        <GroupWrapper>
          <FormStyled
            onChange={() => handleSubmit(group => console.log(group))}
          >
            <CheckboxListContainer>
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
            </CheckboxListContainer>
          </FormStyled>
          <Button
            disabled={isEqual(filters, defaultState.filters)}
            secondary
            small
            onClick={this.handleResetClick}
          >
            Reset Filters
          </Button>
        </GroupWrapper>
        <H5>Filter by package feature</H5>
        <FilterWrapper key={reset}>
          <Sliders
            packages={packages}
            ramChange={value => ramChange(value)}
            cpuChange={value => cpuChange(value)}
            diskChange={value => diskChange(value)}
            costChange={value => costChange(value)}
            defaults={defaults}
            filters={filters}
            reset={reset}
            groupClick={groupClick}
          />
        </FilterWrapper>
      </Wrapper>
    );
  }
}

export default reduxForm({ form: 'type' })(Filters);
