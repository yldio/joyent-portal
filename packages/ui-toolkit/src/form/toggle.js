import React from 'react';
import styled from 'styled-components';
import { Input } from 'normalized-styled-components';
import { Subscriber } from 'joy-react-broadcast';
import remcalc from 'remcalc';
import unitcalc from 'unitcalc';
import rndId from 'rnd-id';
import is from 'styled-is';

import { bottomShadow, border, borderRadius } from '../boxes';
import Baseline from '../baseline';
import BaseInput from './base/input';
import typography from '../typography';

const StyledInput = Input.extend`
  display: none;

  &:checked + label {
    color: ${props => props.theme.secondary};
    font-weight: bold;
    width: 100%;
    position: relative;
  }

  &:selected + label {
    color: ${props => props.theme.secondary};
    font-weight: bold;
    width: 100%;
  }

  &:disabled + label {
    color: ${props => props.theme.grey};

    & + .background {
      display: none;
    }
  }
`;

const Label = styled.label`
  ${typography.normal};

  box-sizing: border-box;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.text};
  cursor: pointer;
  user-select: none;
  position: relative;
  z-index: 1;

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
  box-sizing: border-box;
`);

const Background = styled.span`
  border-right: ${border.unchecked};
  background-color: ${props => props.theme.white};
  display: block;
  border-radius: ${borderRadius};
  position: absolute;
  height: 100%;
  width: 100%;
  z-index: 0;
  transition: ${props => props.theme.transition};
  border: ${props => `${remcalc(1)} solid ${props.theme.grey}`};
  top: ${remcalc(-1)};
`;

const Ul = styled.ul`
  display: inline-block;
  margin: 0;
  padding: 0;
  height: ${remcalc(48)};
  display: inline-flex;
  align-items: flex-end;
  background-color: ${props => props.theme.disabled};
  border-radius: ${borderRadius};
  border: ${border.unchecked};
  position: relative;
  margin-top: ${unitcalc(1)};

  li:first-of-type {
    input + label + .background {
      transform: translateX(calc(100% - ${remcalc(3)}));
    }

    input:checked + label + .background {
      transform: translateX(${remcalc(-1)});
    }
  }

  li:last-of-type .background {
    display: none;
  }
`;

const BaseToggle = BaseInput(({ children, ...rest }) => {
  const render = value => {
    const id = rndId();
    return (
      <Li>
        <InputContainer>
          <StyledInput {...value} {...rest} id={id} type="radio" />
          <Label
            htmlFor={id}
            error={rest.error}
            warning={rest.warning}
            success={rest.success}
          >
            {children}
          </Label>
          <Background className="background" />
        </InputContainer>
      </Li>
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

export default Baseline(Toggle);

export const ToggleList = Baseline(Ul);
