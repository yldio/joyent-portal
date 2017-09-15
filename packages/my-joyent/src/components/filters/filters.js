import React from 'react';
import styled from 'styled-components';
import remcalc from 'remcalc';
import isEqual from 'lodash.isequal';
import { FormLabel, Button } from 'joyent-ui-toolkit';
import { default as defaultState } from '@state/state';

import Sliders from '@components/sliders';

const GroupWrapper = styled.section`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: ${remcalc(36)};
`;

const Wrapper = styled.section`
  /* Comment for prettier */
  width: 100%;
`;

const Filters = ({
  filters,
  ramSliderChange,
  cpuSliderChange,
  diskSliderChange,
  costSliderChange,
  groupChange,
  filterReset
}) => (
  <Wrapper>
    <FormLabel>Choose a package</FormLabel>
    <Sliders
      filters={filters}
      ramSliderChange={ramSliderChange}
      cpuSliderChange={cpuSliderChange}
      diskSliderChange={diskSliderChange}
      costSliderChange={costSliderChange}
    />
    <GroupWrapper>
      <div>
        {filters.groups.sort((a, b) => a.name < b.name ? -1 : 1 ).map(group => (
          <Button
            key={group.name}
            tertiary
            small
            selected={group.selected}
            onClick={() => groupChange(group)}
          >
            {group.name}
          </Button>
        ))}
      </div>
      <Button
        disabled={isEqual(filters, defaultState.filters)}
        secondary
        small
        onClick={filterReset}
      >
        Reset Filters
      </Button>
    </GroupWrapper>
  </Wrapper>
);

export default Filters;
