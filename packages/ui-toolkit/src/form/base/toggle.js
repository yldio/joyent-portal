import React from 'react';
import styled from 'styled-components';
import { Input } from 'normalized-styled-components';
import { Broadcast, Subscriber } from 'react-broadcast';
import { border, borderRadius } from '../../boxes';
import BaseInput from './input';
import remcalc from 'remcalc';
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
  width: ${remcalc(18)};
  height: ${remcalc(18)};
  top: 0;
  box-sizing: border-box;

  cursor: pointer;

  background-color: rgb(255, 255, 255);
  box-shadow: none;
  border: 1px solid ${props => props.theme.grey};
  cursor: pointer;

  ${is('checkbox')`
    border-radius: 4px;
    width: ${remcalc(18)};
    height: ${remcalc(18)};
  `};

  ${is('radio')`
    width: ${remcalc(18)};
    height: ${remcalc(18)};
    border-radius: 50%;
  `};

  ${is('error')`
    border-color: ${props => props.theme.redDark}
  `};

  ${is('warning')`
    border-color: ${props => props.theme.orangeDark}
  `};

  ${is('success')`
    border-color: ${props => props.theme.greenDark}
  `};

  ${is('radio')`
    &::after {
      opacity: 0;
      content: '';
      position: absolute;
      width: ${remcalc(6)};
      height: ${remcalc(6)};
      border-radius: 50%;
      background-color: ${props => props.theme.text};
      top: 50%;
      left: 50%;
      transform: translateX(-50%) translateY(-50%);
    }
  `};

  ${is('checkbox')`
    &::after {
      opacity: 0;
      content: '';
      position: absolute;
      width: ${remcalc(6)};
      height: ${remcalc(2)};
      background: transparent;
      top: ${remcalc(5)};
      left: ${remcalc(4)};
      border: ${remcalc(2)} solid ${props => props.theme.secondaryActive};
      border-top: none;
      border-right: none;
      transform: rotate(-45deg);
    }
  `};
`;

const InnerContainer = styled.div`
  display: inline-block;
  vertical-align: text-bottom;
  margin-right: ${remcalc(8)};
  width: ${remcalc(18)};
  height: ${remcalc(18)};
  position: relative;
  cursor: pointer;
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
          <StyledInput {...rest} id={newValue.id} type={type} />
          <Label
            {...types}
            htmlFor={newValue.id}
            error={rest.error}
            warning={rest.warning}
            success={rest.success}
          />
        </InnerContainer>
      );

      const el = OuterContainer ? (
        <OuterContainer>
          {toggle}
          {children}
        </OuterContainer>
      ) : (
        toggle
      );

      return (
        <Broadcast channel="input-group" value={newValue}>
          {el}
        </Broadcast>
      );
    };

    return <Subscriber channel="input-group">{render}</Subscriber>;
  });

export default ToggleBase;
