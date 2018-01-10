import React from 'react';
import styled from 'styled-components';
import { Subscriber } from 'joy-react-broadcast';
import remcalc from 'remcalc';
import isUndefined from 'lodash.isundefined';
import Label from './label';
import is from 'styled-is';

import BaseInput from './base/input';

const InputContainer = styled.div`
  position: relative;
  vertical-align: text-bottom;
  display: flex;
  align-items: center;
`;

const Input = styled.input`
    display: none;

    &:checked + label {
      background: #3B46CC;
      border: ${remcalc(1)} solid ${props => props.theme.primary};

      &:after {
        left: 50%;
        box-shadow: 0 0 0 ${remcalc(1)} ${props => props.theme.primary};
      }

      &:active {
        box-shadow: none;
        &:after {
          margin-left: -0${remcalc(12)}
        }
      }
    }
  }
`;

const InputLabel = styled.label`
  outline: 0;
  display: block;
  width: ${remcalc(46)};
  height: ${remcalc(24)};
  position: relative;
  cursor: pointer;
  user-select: none;
  box-sizing: border-box;
  background: ${props => props.theme.background};
  border-radius: ${remcalc(23)};
  transition: all 0.3s ease;
  border: ${remcalc(1)} solid ${props => props.theme.grey};
  margin-right: ${remcalc(6)};

  &::selection {
    background: none;
  }

  &:active {
    box-shadow: inset 0 0 0 ${remcalc(24)} ${props => props.theme.grey};
    &:after {
      padding-right: ${remcalc(12)};
    }
  }

  &:hover {
    border: ${remcalc(1)} solid ${props => props.theme.primary};

    &:after {
      box-shadow: 0 0 0 ${remcalc(1)} ${props => props.theme.primary};
    }
  }

  &:after,
  &:before {
    position: relative;
    display: block;
    content: '';
    width: 50%;
    height: 100%;
  }

  &:after {
    left: 0;
    border-radius: 2em;
    background: ${props => props.theme.white};
    transition: left 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275),
      padding 0.3s ease, margin 0.3s ease, box-shadow 0.3s ease;

    box-shadow: 0 0 0 ${remcalc(1)} ${props => props.theme.grey};
  }

  &:active {
    box-shadow: inset 0 0 0 2em ${props => props.theme.grey};
    &:after {
      padding-right: ${remcalc(12)};
    }
  }

  &:before {
    display: none;
  }
  ${is('disabled')`
      &:active {
        box-shadow: none;
        &:after {
          padding-right: 0;
        }
      }
      &:after {
        background: ${props => props.theme.whiteActive};
      }
      &:hover {
        border: ${remcalc(1)} solid ${props => props.theme.grey};

        &:after {
          box-shadow: 0 0 0 ${remcalc(1)} ${props => props.theme.grey};
        }
      }
  `};
`;

const BaseToggle = BaseInput(({ children, ...rest }) => {
  const render = value => {
    const checked =
      isUndefined(rest.value) && isUndefined(rest.checked)
        ? undefined
        : rest.value === true || rest.checked === true;

    return (
      <InputContainer>
        <Input {...rest} checked={checked} type="checkbox" />
        <InputLabel
          htmlFor={rest.id}
          error={rest.error}
          warning={rest.warning}
          success={rest.success}
        />
        <Label> {children}</Label>
      </InputContainer>
    );
  };

  return <Subscriber channel="input-group">{render}</Subscriber>;
});

/**
 * @example ./usage-toggle.md
 */
const Toggle = ({ children, ...rest }) => (
  <BaseToggle {...rest}>{children}</BaseToggle>
);

export default Toggle;
