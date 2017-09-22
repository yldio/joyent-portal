import React, { Component } from 'react';
import styled from 'styled-components';
import remcalc from 'remcalc';
import isEqual from 'lodash.isequal';
import { Label, Button, Slider } from 'joyent-ui-toolkit';
import { default as defaultState } from '@state/state';

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

const getFirstAndLast = (arr, key) => {
  const sorted = arr.sort(
    (a, b) => (a[key] === b[key] ? 0 : a[key] < b[key] ? -1 : 1)
  );

  if (sorted.length > 0) {
    return {
      min: parseFloat(sorted[0][key]),
      max: parseFloat(sorted[sorted.length - 1][key])
    };
  }
};

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

    this.groupChange = this.groupChange.bind(this);
    this.handleResetClick = this.handleResetClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { packages } = nextProps;
    packages.length > 1 && 
    this.setState({
      ram: getFirstAndLast(packages, 'memory'),
      cpu: getFirstAndLast(packages, 'vcpus'),
      disk: getFirstAndLast(packages, 'disk'),
      cost: getFirstAndLast(packages, 'price')
    });
  }

  groupChange(group) {
    this.props.groupChange(group);

    this.setState({
      groupClick: this.state.groupClick + 1
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { groupClick, reset } = this.state;
    const { filters } = this.props;
    const filtersMap = filter => ({
      ram: filter.ram,
      cost: filter.cost,
      cpu: filter.cpu,
      disk: filter.disk
    });
    return (
      (nextState.groupClick !== groupClick &&
        isEqual(filtersMap(filters), filtersMap(nextProps.filters))) ||
      nextState.reset !== reset
    );
  }

  handleResetClick() {
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
  }

  render() {
    const {
      filters,
      ramSliderChange,
      cpuSliderChange,
      diskSliderChange,
      costSliderChange,
      packages
    } = this.props;

    const { reset, cpu, cost, ram, disk, defaults } = this.state;
    return (
      <Wrapper>
        <Title>Choose package</Title>
        <Subtitle marginBottom="1">Filter by package type</Subtitle>
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
          <Slider
            greyed={packages.length === 0}
            minValue={defaults.ram.min}
            maxValue={defaults.ram.max}
            step={0.256}
            value={ram}
            key={`${ram.min}-${ram.max}`}
            onChangeComplete={value => ramSliderChange(value)}
          >
            GB RAM
          </Slider>
          <Slider
            greyed={packages.length === 0}
            minValue={defaults.cpu.min}
            maxValue={defaults.cpu.max}
            step={0.25}
            value={cpu}
            key={`${cpu.min}-${cpu.max}`}
            onChangeComplete={value => cpuSliderChange(value)}
          >
            vCPUs
          </Slider>
          <Slider
            greyed={packages.length === 0}
            minValue={defaults.disk.min}
            maxValue={defaults.disk.max}
            step={0.01}
            value={disk}
            key={`${disk.min}-${disk.max}`}
            onChangeComplete={value => diskSliderChange(value)}
          >
            TB Disk
          </Slider>
          <Slider
            greyed={packages.length === 0}
            minValue={defaults.cost.min}
            maxValue={defaults.cost.max}
            step={0.02}
            value={cost}
            key={`${cost.min}-${ram.max}`}
            onChangeComplete={value => costSliderChange(value)}
          >
            $/hr
          </Slider>
        </FilterWrapper>
      </Wrapper>
    );
  }
}

export default Filters;
