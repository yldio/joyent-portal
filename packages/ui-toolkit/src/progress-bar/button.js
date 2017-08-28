import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import unitcalc from 'unitcalc';
import theme from '../theme';
import Button from '../button';
import remcalc from 'remcalc';
import Baseline from '../baseline';
import Indicator from './indicator';
import is, { isNot, isOr } from 'styled-is';

const StyledButton = styled(Button)`
  padding: ${unitcalc(2)} ${unitcalc(3)} ${unitcalc(2)} ${unitcalc(2)};
  background-color: ${theme.white};
  color: ${theme.secondary};
  text-align: left;
  border: none;
  box-shadow: none;
  line-height: 1.6;
  cursor: default;

  &:focus {
    background-color: ${theme.white};
    border: none;
    color: ${theme.secondary};
  }

  &:hover {
    background-color: ${theme.white};
    border: none;
    color: ${theme.secondary};
  }

  &:active,
  &:active:hover,
  &:active:focus {
    background-color: ${theme.white};
    border: none;
    color: ${theme.secondary};
  }
`;

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: ${props => props.zIndex};

  padding-left: ${remcalc(40)};
  border-top: ${remcalc(1)} solid ${props => props.theme.grey};
  border-bottom: ${remcalc(1)} solid ${props => props.theme.grey};

  ${isOr('active', 'completed')`
    border-top: ${remcalc(1)} solid ${props => props.theme.greenDark};
    border-bottom: ${remcalc(1)} solid ${props => props.theme.greenDark};
  `}

  ${is('first')`
    border-left: ${remcalc(1)} solid ${props => props.theme.greenDark};
    padding-left: ${remcalc(13)};
  `}

  ${isNot('first', 'completed', 'active')`
    border-right: ${remcalc(1)} solid ${props => props.theme.grey};
  `}

  ${isOr('active', 'completed')`
    border-right: ${remcalc(1)} solid ${props => props.theme.greenDark};
  `}

  ${isNot('last')`
    border-right: none;
  `}
`;

const StyledArrow = styled.span`
  position: absolute;
  top: 0;
  right: -${remcalc(27)};
  border: solid ${props => props.theme.grey};
  border-width: 0 ${remcalc(1)} ${remcalc(1)} 0;
  padding: ${remcalc(17.1)};
  transform: rotate(-45deg);
  margin: ${remcalc(6.4)} ${remcalc(10)} ${remcalc(6.4)} ${remcalc(10)};

  ${is('last')`
    display: none;
  `};

  ${isOr('completed', 'active')`
    border-color: ${props => props.theme.greenDark};
  `};
`;

const ProgressbarButton = ({
  children,
  first,
  completed,
  active,
  last,
  ...rest
}) => {
  const state = {
    first,
    completed,
    active,
    last
  };

  return (
    <StyledContainer {...state} {...rest}>
      <Indicator {...state} />
      <StyledButton {...state}>{children}</StyledButton>
      <StyledArrow {...state} />
    </StyledContainer>
  );
};

ProgressbarButton.propTypes = {
  zIndex: PropTypes.string,
  active: PropTypes.bool,
  completed: PropTypes.bool,
  first: PropTypes.bool,
  last: PropTypes.bool,
  onClick: PropTypes.func
};

export default Baseline(ProgressbarButton);
