import React from 'react';
import styled from 'styled-components';
import { remcalc, unitcalc, is } from '../../../shared/functions';
import { Subscriber } from 'react-broadcast';
import { Baseline } from '../../../shared/composers';
import BaseInput from '../base-input';
import { boxes, colors } from '../../../shared/constants';

const Input = styled.input`
  display: none;

  &:checked + label {
    border-radius: ${remcalc(4)};
    background-color: ${colors.base.white};
    box-shadow: ${boxes.bottomShaddow};
    color: ${colors.base.secondary};
  }

  &:selected + label {
    border-radius: ${remcalc(4)};
    background-color: ${colors.base.white};
    box-shadow: ${boxes.bottomShaddow};
    color: ${colors.base.secondary};
  }

  &:disabled + label {
    color: ${colors.base.grey};
  }
`;

const Label = styled.label`
  position: absolute;
  box-sizing: border-box;
  width: ${unitcalc(20)};
  height: ${unitcalc(8)};
  top: 0;
  left: 0;
  text-align: center;
  padding-top: ${unitcalc(2)};
  color: ${colors.base.text};

  ${is('error')`
    border-color: ${colors.inputError}
  `};

  ${is('warning')`
    border-color: ${colors.inputWarning}
  `};

  ${is('success')`
    border-color: ${colors.base.green}
  `};

  &:hover {
    color: ${colors.base.secondaryHover};
  }
`;

const InputContainer = styled.div`
  position: relative;
  vertical-align: text-bottom;
  width: ${unitcalc(20)};
  height: ${unitcalc(8)};
`;

const StyledLi = BaseInput(styled.li`
  display: inline-block;
  list-style-type: none;
  vertical-align: text-bottom;
  border-top: ${boxes.border.unchecked};
  border-bottom: ${boxes.border.unchecked};
  border-left: ${boxes.border.unchecked};
  &:first-of-type {
    border-radius: ${boxes.borderRadius} 0 0 ${boxes.borderRadius};
  }
  &:last-of-type {
    border-radius: 0 ${boxes.borderRadius} ${boxes.borderRadius} 0;
    border-right: ${boxes.border.unchecked};
  }
`);

const StyledUl = styled.ul`
  display: inline-block;
  margin: 0;
  padding: 0;
  box-shadow: ${boxes.bottomShaddow};
`;

const Toggle = BaseInput(({
  children,
  ...props
}) => {
  const render = (value) => {
    return (
      <StyledLi>
        <InputContainer>
          <Input
            {...props}
            {...value}
            type='radio'
          />
          <Label
            htmlFor={value.id}
            // eslint-disable-next-line react/prop-types
            error={props.error}
            // eslint-disable-next-line react/prop-types
            warning={props.warning}
            // eslint-disable-next-line react/prop-types
            success={props.success}
          >
            {children}
          </Label>
        </InputContainer>
      </StyledLi>
    );
  };

  return (
    <Subscriber channel='input-group'>
      {render}
    </Subscriber>
  );
});

export default Baseline(
  Toggle
);

export const ToggleList = Baseline(
  StyledUl
);
