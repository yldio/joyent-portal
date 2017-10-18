import React, { Component } from 'react';
import styled from 'styled-components';
import remcalc from 'remcalc';
import isEqual from 'lodash.isequal';
import { Button, Label } from 'joyent-ui-toolkit';
import { default as defaultState } from '@state/state';
import { default as DiskTypeFrom } from '@components/diskTypeForm';
import Sliders from './sliders';

const FilterWrapper = styled.section`
  display: flex;

  > div {
    flex-grow: 1;

    &:not(:last-child) {
      margin-right: ${remcalc(36)};
    }
  }
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

const Title = styled(Label)`
  line-height: 24px;
  font-size: 21px;
  margin-bottom: ${remcalc(18)};
`;

const Subtitle = styled(Label)`
  /* Comment for prettier */
  margin-bottom: ${remcalc(8)};
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

  handleDiskChange = val => {
    this.props.diskTypeChange(val);

    // if the object is empty or all values are false we want to reset
    if (Object.keys(val).length === 0 || Object.keys(val).every(i => !val[i])) {
      this.handleResetClick();
    }
  };

  render() {
    const {
      filters,
      ramSliderChange,
      cpuSliderChange,
      diskSliderChange,
      costSliderChange,
      packages
    } = this.props;

    const { reset, defaults, groupClick } = this.state;

    return (
      <Wrapper>
        <Title>Choose package</Title>
        <Subtitle>Filter by package type</Subtitle>
        <GroupWrapper>
          <div>
            {filters.groups
              .sort((a, b) => (a.name < b.name ? -1 : 1))
              .map(group => (
                <Button
                  key={group.name}
                  tertiary
                  small
                  selected={group.selected}
                  onClick={() => this.groupChange(group)}
                >
                  {group.name}
                </Button>
              ))}
          </div>
          <Button
            disabled={isEqual(filters, defaultState.filters)}
            secondary
            small
            onClick={this.handleResetClick}
          >
            Reset Filters
          </Button>
        </GroupWrapper>
        <Label>Filter by package feature</Label>
        <FilterWrapper key={reset}>
          <Sliders
            packages={packages}
            ramSliderChange={value => ramSliderChange(value)}
            cpuSliderChange={value => cpuSliderChange(value)}
            diskSliderChange={value => diskSliderChange(value)}
            costSliderChange={value => costSliderChange(value)}
            defaults={defaults}
            filters={filters}
            reset={reset}
            groupClick={groupClick}
          />

          <DiskTypeFrom onChange={params => this.handleDiskChange(params)} />
        </FilterWrapper>
      </Wrapper>
    );
  }
}

export default Filters;
