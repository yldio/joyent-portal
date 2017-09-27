import React from 'react';
import styled from 'styled-components';
import remcalc from 'remcalc';
import Baseline from '../baseline';
import { TickIcon } from '../icons';
import is, { isOr } from 'styled-is';

const Tick = styled(TickIcon)`
  fill: none;

  ${is('active')`
    fill: ${props => props.theme.secondary};
  `};

  ${is('completed')`
    fill: ${props => props.theme.white};
  `};
`;

const StyledIndicator = styled.span`
  display: inline-block;
  border-radius: 50%;
  width: ${remcalc(18)};
  height: ${remcalc(18)};
  background: inherit;
  border: ${remcalc(1)} solid ${props => props.theme.grey};
  display: flex;
  justify-content: center;
  align-items: center;

  ${isOr('completed', 'active')`
    border: ${remcalc(1)} solid ${props => props.theme.greenDark};
  `};

  ${is('completed')`
    background: ${props => props.theme.green};
  `};
`;

const Indicator = ({ first, completed, active, last, ...rest }) => {
  const state = {
    first,
    completed,
    active,
    last
  };

  return (
    <StyledIndicator {...state} {...rest}>
      <Tick {...state} />
    </StyledIndicator>
  );
};

export default Baseline(Indicator);
