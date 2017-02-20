import { remcalc, is } from '../../shared/functions';
import { Subscriber } from 'react-broadcast';
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
      width: ${remcalc(8)};
      height: ${remcalc(8)};
      border-radius: ${remcalc(4)};
      background-color: ${colors.base.secondaryDark};
      border-top: none;
      border-right: none;
      top: ${remcalc(8)};
      left: ${remcalc(8)};
    }
  `};

  ${is('checkbox')`
    &::after {
      opacity: 0;
      content: '';
      position: absolute;
      width: ${remcalc(9)};
      height: ${remcalc(4)};
      background: transparent;
      top: ${remcalc(7)};
      left: ${remcalc(7)};
      border: ${remcalc(3)} solid #333;
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
  margin-right: ${remcalc(12)}
  vertical-align: text-bottom;
  width: ${remcalc(24)};
  height: ${remcalc(24)};
  position: relative;
`;

const Toggle = ({
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

  const render = (value) => {
    const toggle = (
      <InnerContainer type={type}>
        <Input
          {...props}
          {...value}
          type={type}
        />
        <Label
          {...types}
          htmlFor={value.id}
          // eslint-disable-next-line react/prop-types
          error={props.error}
          // eslint-disable-next-line react/prop-types
          warning={props.warning}
          // eslint-disable-next-line react/prop-types
          success={props.success}
        />
      </InnerContainer>
    );

    return !OuterContainer ? toggle : (
      <OuterContainer>
        {toggle}
        {children}
      </OuterContainer>
    );
  };

  return (
    <Subscriber channel='input-group'>
      {render}
    </Subscriber>
  );
});

export default Toggle;
