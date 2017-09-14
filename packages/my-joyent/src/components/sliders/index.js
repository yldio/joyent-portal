import React from 'react';
import { Slider } from 'joyent-ui-toolkit';
import styled from 'styled-components';
import remcalc from 'remcalc';

const FilterWrapper = styled.section`
  display: flex;

  > div {
    flex-grow: 1;

    &:not(:last-child) {
      margin-right: ${remcalc(36)};
    }
  }
`;

const Sliders = ({
  filters: { cpu, cost, ram, disk },
  ramSliderChange,
  cpuSliderChange,
  diskSliderChange,
  costSliderChange
}) => (
  <FilterWrapper>
    <Slider
      minValue={ram.min}
      maxValue={ram.max}
      step={0.256}
      value={ram}
      onChangeComplete={value => ramSliderChange(value)}
    >
      GB RAM
    </Slider>
    <Slider
      minValue={cpu.min}
      maxValue={cpu.max}
      step={0.25}
      value={cpu}
      onChangeComplete={value => cpuSliderChange(value)}
    >
      vCPUs
    </Slider>
    <Slider
      minValue={disk.min}
      maxValue={disk.max}
      step={0.01}
      value={disk}
      onChangeComplete={value => diskSliderChange(value)}
    >
      TB Disk
    </Slider>
    <Slider
      minValue={cost.min}
      maxValue={cost.max}
      step={0.02}
      value={cost}
      onChangeComplete={value => costSliderChange(value)}
    >
      $/hr
    </Slider>
  </FilterWrapper>
);

export default Sliders;
