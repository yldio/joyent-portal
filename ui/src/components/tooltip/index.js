import { remcalc } from '../../shared/functions';
import { baseBox, pseudoEl, Baseline } from '../../shared/composers';
import { colors } from '../../shared/constants';
import styled from 'styled-components';
import React from 'react';

const ItemPadder = 9;
const WrapperPadder = 24;
const ulPadder = `${WrapperPadder - ItemPadder} 0`;

const StyledList = styled.ul`
  position: relative;
  background: #fff;
  color: #646464;
  display: inline-block;
  font-family: sans-serif;
  list-style-type: none;
  margin: 0;
  padding: ${remcalc(ulPadder)};
  min-width: ${remcalc(200)};

  ${props => props.styles}

  ${baseBox()}

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
    border-bottom-color: #fff;
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
