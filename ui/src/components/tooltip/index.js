import { remcalc } from '../../shared/functions';
import {
  baseBox,
  pseudoEl,
  Baseline,
  moveZ
} from '../../shared/composers';
import { colors } from '../../shared/constants';
import styled from 'styled-components';
import React from 'react';

const ItemPadder = 9;
const WrapperPadder = 24;

const StyledList = styled.ul`
  background: ${colors.base.white};
  color: ${colors.base.text};
  display: inline-block;
  font-family: sans-serif;
  list-style-type: none;
  margin: 0;
  padding: 0;
  min-width: ${remcalc(200)};

  ${props => props.styles}
  ${baseBox()}
  
  ${moveZ({
    amount: 1
  })}

  & > * {

    padding: ${remcalc(ItemPadder)} ${remcalc(WrapperPadder)};

    &:hover {
      background: ${colors.base.grey};
    }
  }

  &:after, &:before {
    border: solid transparent;
    height: 0;
    width: 0;

    ${ props => pseudoEl(props.arrowPosition) }
  }

  &:after {
    border-color: rgba(255, 255, 255, 0);
    border-bottom-color: ${colors.base.white};
    border-width: ${remcalc(10)};
    margin-left: ${remcalc(-10)};
  }
  &:before {
    border-color: rgba(216, 216, 216, 0);
    border-bottom-color: ${colors.base.greyDark};
    border-width: ${remcalc(12)};
    margin-left: ${remcalc(-12)};
  }
`;

const Tooltip = ({
  children,
  arrowPosition = {
    bottom: '100%',
    left: '10%'
  },
  ...props
}) => (
  <StyledList arrowPosition={arrowPosition} {...props}>
    {children}
  </StyledList>
);

Tooltip.propTypes = {
  arrowPosition: React.PropTypes.object,
  children: React.PropTypes.node
};

export default Baseline(
  Tooltip
);
