import { remcalc, unitcalc, is, rndId } from '../../shared/functions';
import { Broadcast, Subscriber } from 'react-broadcast';
import { boxes, colors } from '../../shared/constants';
import BaseInput from './base-input';
import styled from 'styled-components';
import React from 'react';

const Input = styled.input`
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
  box-shadow: ${boxes.insetShaddow};
  border: ${boxes.border.unchecked};

  ${is('checkbox')`
    border-radius: ${boxes.borderRadius};
  `};

  ${is('radio')`
    border-radius: ${remcalc(11)};
  `};

  ${is('error')`
    border-color: ${colors.inputError}
  `};

  ${is('warning')`
    border-color: ${colors.inputWarning}
  `};

  ${is('success')`
    border-color: ${colors.base.green}
  `};

  ${is('radio')`
    &::after {
      opacity: 0;
      content: '';
      position: absolute;
      width: ${remcalc(10)};
      height: ${remcalc(10)};
      border-radius: ${remcalc(5)};
      background-color: ${colors.base.secondaryActive};
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
      border: ${unitcalc(0.5)} solid ${colors.base.secondaryActive};
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

const ToggleBase = ({
  container = null,
  type = 'radio'
}) => BaseInput(({
  children,
  ...props
}) => {
  const OuterContainer = container
    ? container
    : null;

  const types = {
    [type]: true
  };

  const render = ({
    // eslint-disable-next-line react/prop-types
    id, // ignore id from value
    ...oldValue
  }) => {
    const newValue = {
      ...oldValue,
      id: rndId()
    };

    const toggle = (
      <InnerContainer {...types} type={type}>
        <Input
          {...props}
          {...oldValue}
          id={newValue.id}
          type={type}
        />
        <Label
          {...types}
          htmlFor={newValue.id}
          // eslint-disable-next-line react/prop-types
          error={props.error}
          // eslint-disable-next-line react/prop-types
          warning={props.warning}
          // eslint-disable-next-line react/prop-types
          success={props.success}
        />
      </InnerContainer>
    );

    const el = !OuterContainer ? toggle : (
      <OuterContainer>
        {toggle}
        {children}
      </OuterContainer>
    );

    return (
      <Broadcast channel='input-group' value={newValue}>
        {el}
      </Broadcast>
    );
  };

  return (
    <Subscriber channel='input-group'>
      {render}
    </Subscriber>
  );
});

export default ToggleBase;
