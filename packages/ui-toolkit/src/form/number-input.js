import BaseInput, { Stylable } from './base/input';
import { Subscriber } from 'react-broadcast';
import Baseline from '../baseline';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import IconButton from '../icon-button';
import unitcalc from 'unitcalc';
import { PlusIcon, MinusIcon } from '../icons';

const StyledContainer = styled.div`
  margin-bottom: ${unitcalc(4)};
`;

const StyledNumberInput = styled(BaseInput(Stylable('input')))`
  width: ${unitcalc(20)};
  margin: 0 ${unitcalc(1)} 0 0;
  vertical-align: middle;
`;

/**
 * @example ./usage-number-input.md
 */
const NumberInput = BaseInput(props => {
  const { children, minValue, maxValue, ...rest } = props;

  const render = value => {
    const handleMinusClick = evt => {
      evt.preventDefault();
      const nextValue = value.input.value - 1;
      value.input.onChange(nextValue);
    };

    const handlePlusClick = evt => {
      evt.preventDefault();
      const nextValue = value.input.value + 1;
      value.input.onChange(nextValue);
    };

    return (
      <StyledContainer>
        <StyledNumberInput {...props} />
        <IconButton onClick={handleMinusClick}>
          <MinusIcon verticalAlign="middle" />
        </IconButton>
        <IconButton onClick={handlePlusClick}>
          <PlusIcon verticalAlign="middle" />
        </IconButton>
      </StyledContainer>
    );
  };

  return (
    <Subscriber channel="input-group">
      {render}
    </Subscriber>
  );
});

NumberInput.propTypes = {
  value: PropTypes.number,
  minValue: PropTypes.number,
  maxValue: PropTypes.number,
  onChange: PropTypes.func
};

export default Baseline(NumberInput);

export const NumberInputNormalize = ({ minValue, maxValue }) => {
  return value => {
    if (value === '') {
      return '';
    }
    if (
      !isNaN(value) &&
      (isNaN(minValue) || value >= minValue) &&
      (isNaN(maxValue) || value <= maxValue)
    ) {
      return Number(value);
    }
  };
};
