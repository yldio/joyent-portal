import React from 'react';
import { Col } from 'react-styled-flexboxgrid';
import styled from 'styled-components';
import remcalc from 'remcalc';
import { Slider, FormLabel } from 'joyent-ui-toolkit';

const FilterWrapper = styled.section`
  display: flex;
  width: 100%;

  > div {
    flex-grow: 1;

    &:not(:last-child) {
      margin-right: ${remcalc(36)};
    }
  }
`;

const Filters = ({
  filters: { cpu, cost, ram, disk },
  ramSliderChange,
  cpuSliderChange,
  diskSliderChange,
  costSliderChange
}) => {
  return (
    <Col xs={12}>
      <FormLabel>Choose a package</FormLabel>
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
    </Col>
  );
};

export default Filters;
