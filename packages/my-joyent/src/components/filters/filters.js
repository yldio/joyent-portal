import React, { Component } from 'react';
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

class Filters extends Component {
  constructor(props) {
    super(props);

    this.state = {
      reset: 0
    };

    this.handleResetClick = this.handleResetClick.bind(this);
  }

  handleResetClick() {
    const { filterReset } = this.props;
    const { reset } = this.state;
    filterReset();

    this.setState({
      reset: reset + 1
    });
  }

  render() {
    const {
      filters,
      ramSliderChange,
      cpuSliderChange,
      diskSliderChange,
      costSliderChange,
      groupChange
    } = this.props;

    const { reset } = this.state;

    return (
      <Wrapper>
        <FormLabel>Choose a package</FormLabel>
        <Sliders
          reset={reset}
          filters={filters}
          ramSliderChange={ramSliderChange}
          cpuSliderChange={cpuSliderChange}
          diskSliderChange={diskSliderChange}
          costSliderChange={costSliderChange}
        />
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
            onClick={this.handleResetClick}
          >
            Reset Filters
          </Button>
        </GroupWrapper>
      </Wrapper>
    );
  }
}

export default Filters;
