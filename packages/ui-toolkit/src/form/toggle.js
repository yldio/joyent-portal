import React from 'react';
import styled from 'styled-components';
import { Input } from 'normalized-styled-components';
import remcalc from 'remcalc';
import unitcalc from 'unitcalc';
import rndId from 'rnd-id';
import is from 'styled-is';
import { Subscriber } from 'react-broadcast';
import { bottomShaddow, border, borderRadius } from '../boxes';
import Baseline from '../baseline';
import BaseInput from './base/input';
import typography from '../typography';

const StyledInput = Input.extend`
  display: none;

  &:checked + label {
    border-radius: ${remcalc(4)};
    background-color: ${props => props.theme.white};
    box-shadow: ${bottomShaddow};
    color: ${props => props.theme.secondary};
  }

  &:selected + label {
    border-radius: ${remcalc(4)};
    background-color: ${props => props.theme.white};
    box-shadow: ${bottomShaddow};
    color: ${props => props.theme.secondary};
  }

  &:disabled + label {
    color: ${props => props.theme.grey};
  }
`;

const Label = styled.label`
  ${typography.fontFamily};
  ${typography.normal};

  position: absolute;
  box-sizing: border-box;
  width: ${unitcalc(20)};
  height: ${unitcalc(8)};
  top: 0;
  left: 0;
  text-align: center;
  padding-top: ${unitcalc(2)};
  color: ${props => props.theme.text};

  ${is('error')`
    border-color: ${props => props.theme.redDark}
  `};

  ${is('warning')`
    border-color: ${props => props.theme.orangeDark}
  `};

  ${is('success')`
    border-color: ${props => props.theme.greenDark}
  `};

  &:hover {
    color: ${props => props.theme.secondaryHover};
  }
`;

const InputContainer = styled.div`
  position: relative;
  vertical-align: text-bottom;
  width: ${unitcalc(20)};
  height: ${unitcalc(8)};
`;

const Li = BaseInput(styled.li`
  display: inline-block;
  list-style-type: none;
  vertical-align: text-bottom;
  border-top: ${border.unchecked};
  border-bottom: ${border.unchecked};
  border-left: ${border.unchecked};
  &:first-of-type {
    border-radius: ${borderRadius} 0 0 ${borderRadius};
  }
  &:last-of-type {
    border-radius: 0 ${borderRadius} ${borderRadius} 0;
    border-right: ${border.unchecked};
  }
`);

const Ul = styled.ul`
  display: inline-block;
  margin: 0;
  padding: 0;
  box-shadow: ${bottomShaddow};
`;

const BaseToggle = BaseInput(({ children, ...rest }) => {
  const render = value => {
    const id = rndId();
    return (
      <Li>
        <InputContainer>
          <StyledInput
            checked={value.value === rest.value}
            {...value}
            {...rest}
            id={id}
            type="radio"
          />
          <Label
            htmlFor={id}
            error={rest.error}
            warning={rest.warning}
            success={rest.success}
          >
            {children}
          </Label>
        </InputContainer>
      </Li>
    );
  };

  return (
    <Subscriber channel="input-group">
      {render}
    </Subscriber>
  );
});

/**
 * @example ./usage-toggle.md
 */
const Toggle = ({ children, ...rest }) =>
  <BaseToggle {...rest}>
    {children}
  </BaseToggle>;

export default Baseline(Toggle);

export const ToggleList = Baseline(Ul);
