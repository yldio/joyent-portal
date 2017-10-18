import React, { Component } from 'react';
import { Slider } from 'joyent-ui-toolkit';
import isEqual from 'lodash.isequal';

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

class Sliders extends Component {
  constructor(props) {
    super(props);
    const { filters: { cpu, cost, ram, disk }, reset, groupClick } = this.props;

    this.state = {
      reset,
      ram,
      cpu,
      disk,
      cost,
      groupClick
    };
  }

  componentWillReceiveProps(nextProps) {
    const { packages, groupClick, reset } = nextProps;
    packages.length > 1 &&
      this.setState({
        ram: getFirstAndLast(packages, 'memory'),
        cpu: getFirstAndLast(packages, 'vcpus'),
        disk: getFirstAndLast(packages, 'disk'),
        cost: getFirstAndLast(packages, 'price'),
        groupClick,
        reset
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
      nextState.reset !== reset ||
      !isEqual(nextProps.filters.diskType, filters.diskType)
    );
  }

  render() {
    const {
      ramSliderChange,
      cpuSliderChange,
      diskSliderChange,
      costSliderChange,
      packages,
      defaults
    } = this.props;

    const { cpu, cost, ram, disk } = this.state;
    return [
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
      </Slider>,
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
      </Slider>,
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
      </Slider>,
      <Slider
        greyed={packages.length === 0}
        minValue={defaults.cost.min}
        maxValue={defaults.cost.max}
        step={0.016}
        value={cost}
        key={`${cost.min}-${cost.max}`}
        onChangeComplete={value => costSliderChange(value)}
      >
        $/hr
      </Slider>
    ];
  }
}

export default Sliders;
