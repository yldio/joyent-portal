import React from 'react';
import styled from 'styled-components';
import { Input } from 'normalized-styled-components';
import { Broadcast, Subscriber } from 'react-broadcast';
import { insetShaddow, border, borderRadius } from '../../boxes';
import BaseInput from './input';
import remcalc from 'remcalc';
import unitcalc from 'unitcalc';
import is from 'styled-is';
import rndId from 'rnd-id';

const StyledInput = Input.extend`
  display: none;

  &:checked + label::after {
    opacity: 1;
  }

  &:selected + label::after {
    opacity: 1;
  }

  &:disabled + label {
    background-color: rgb(249, 249, 249);
  }

  &:disabled + label::after {
    opacity: 0.3;
  }
`;

const Label = styled.label`
  color: rgb(100, 100, 100);
  position: absolute;
  width: ${remcalc(22)};
  height: ${remcalc(22)};
  top: 0;

  background-color: rgb(255, 255, 255);
  box-shadow: ${insetShaddow};
  border: ${border.unchecked};

  ${is('checkbox')`
    border-radius: ${borderRadius};
  `};

  ${is('radio')`
    border-radius: ${remcalc(11)};
  `};

  ${is('error')`
    border-color: ${props => props.theme.red}
  `};

  ${is('warning')`
    border-color: ${props => props.theme.orange}
  `};

  ${is('success')`
    border-color: ${props => props.theme.green}
  `};

  ${is('radio')`
    &::after {
      opacity: 0;
      content: '';
      position: absolute;
      width: ${remcalc(10)};
      height: ${remcalc(10)};
      border-radius: ${remcalc(5)};
      background-color: ${props => props.theme.secondaryActive};
      top: ${remcalc(6)};
      left: ${remcalc(6)};
    }
  `};

  ${is('checkbox')`
    &::after {
      opacity: 0;
      content: '';
      position: absolute;
      width: ${unitcalc(1.5)};
      height: ${remcalc(4)};
      background: transparent;
      top: ${remcalc(7)};
      left: ${remcalc(7)};
      border: ${unitcalc(0.5)} solid ${props => props.theme.secondaryActive};
      border-top: none;
      border-right: none;
      transform: rotate(-45deg);
    }
  `};

  &:hover {
    &::after {
      opacity: 0.3;
    }
  }
`;

const InnerContainer = styled.div`
  display: inline-block;
  vertical-align: text-bottom;
  margin-right: ${unitcalc(2)};
  width: ${unitcalc(4)};
  height: ${unitcalc(4)};
  position: relative;
`;

const ToggleBase = ({ container = null, type = 'radio' }) =>
  BaseInput(({ children, ...rest }) => {
    const OuterContainer = container ? container : null;

    const types = {
      [type]: true
    };

    const render = ({
      id, // ignore id from value
      ...oldValue
    }) => {
      const newValue = {
        ...oldValue,
        id: rndId()
      };

      const toggle = (
        <InnerContainer {...types} type={type}>
          <StyledInput {...rest} {...oldValue} id={newValue.id} type={type} />
          <Label
            {...types}
            htmlFor={newValue.id}
            error={rest.error}
            warning={rest.warning}
            success={rest.success}
          />
        </InnerContainer>
      );

      const el = OuterContainer
        ? <OuterContainer>
            {toggle}
            {children}
          </OuterContainer>
        : toggle;

      return (
        <Broadcast channel="input-group" value={newValue}>
          {el}
        </Broadcast>
      );
    };

    return (
      <Subscriber channel="input-group">
        {render}
      </Subscriber>
    );
  });

export default ToggleBase;
