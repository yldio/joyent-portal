import { Subscriber } from 'joy-react-broadcast';
import styled from 'styled-components';
import { Nav } from 'normalized-styled-components';
import Baseline from '../baseline';
import remcalc from 'remcalc';
import is, { isOr, isNot } from 'styled-is';
import PropTypes from 'prop-types';
import Button from '../button';
import React from 'react';

const StyledNav = Nav.extend`
  flex: 0 0 ${remcalc(47)};
  border-left: ${remcalc(1)} solid ${props => props.theme.grey};
  box-sizing: border-box;

  ${isOr('disabled', 'active')`
    border-left-color: ${props => props.theme.grey};
  `};

  ${is('fromHeader') &&
    isNot('disabled')`
    border-left-color: ${props => props.theme.primary};
  `};
`;

const StyledButton = Button.extend`
  position: relative;
  border-width: 0;
  box-shadow: none;
  width: 100%;
  min-width: ${remcalc(46)} !important;
  height: ${remcalc(124)};

  display: flex;
  justify-content: center;
  align-items: center;

  overflow-x: visible;
  overflow-y: visible;

  ${is('collapsed')`
    height: ${remcalc(46)};
  `};

  &:focus {
    border-width: 0;
  }

  &:hover {
    border-width: 0;
  }

  &:active,
  &:active:hover,
  &:active:focus {
    border-width: 0;
  }

  ${is('disabled')`
    background-color: ${props => props.theme.disabled};
    border-color: ${props => props.theme.grey};

    &:focus,
    &:hover,
    &:active,
    &:active:hover,
    &:active:focus {
      background-color: ${props => props.theme.grey};
    }

    
  `};
`;

const StyledContainer = styled.div`
  position: absolute;
  left: 50%;
  top: 35%; /* I don't know why this doesn't center with 50% */
`;

const StyledCircle = styled.div`
  margin: 0 0 ${remcalc(2)} ${remcalc(-2)};
  border-radius: 50%;
  background-color: ${props => props.theme.white};
  width: ${remcalc(4)};
  height: ${remcalc(4)};

  ${is('secondary')`
    background-color: ${props => props.theme.secondary};
  `};

  ${is('disabled')`
    background-color: ${props => props.theme.text};
  `};
`;

const Options = ({ children, ...rest }) => {
  const render = ({ fromHeader = false, collapsed = false, active = true }) => (
    <StyledNav active={active} fromHeader={fromHeader} name="card-options">
      <StyledButton
        secondary={!fromHeader}
        collapsed={collapsed}
        active={active}
        rect
        {...rest}
      >
        <StyledContainer>
          <StyledCircle {...rest} active={active} secondary={!fromHeader} />
          <StyledCircle {...rest} active={active} secondary={!fromHeader} />
          <StyledCircle {...rest} active={active} secondary={!fromHeader} />
        </StyledContainer>
      </StyledButton>
    </StyledNav>
  );

  return <Subscriber channel="card">{render}</Subscriber>;
};

Options.propTypes = {
  collapsed: PropTypes.bool,
  fromHeader: PropTypes.bool
};

export default Baseline(Options);
