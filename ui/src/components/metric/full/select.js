import { remcalc } from '../../../shared/functions';
import { pseudoEl, Baseline } from '../../../shared/composers';
import { colors } from '../../../shared/constants';
import React from 'react';
import styled from 'styled-components';

const SelectWrapper = styled.div`
  position: relative;
  display: flex;
  text-align: right !important;

  &:after {
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid ${colors.base.white};

    ${pseudoEl({
      top: '28px',
      right: '18px'
    })}
  }
`;

const StyledSelect = styled.select`
  padding: ${remcalc(18)} ${remcalc(24)};
  min-width: ${remcalc(154)};
  font-size:16px;
  text-align: right !important;
  border-radius: 0;
  color: ${colors.base.white};
  background-color: ${colors.base.primaryDesaturated};
  border: none;
  border-left: solid ${remcalc(1)} ${colors.base.primaryDesaturated};
  appearance: none;
  cursor: pointer;

  &:hover,
  &:focus,
  &:active,
  &:active:hover,
  &:active:focus {
    background-color: ${colors.base.primaryHover};
    border: none;
    border-left: solid ${remcalc(1)} ${colors.base.primaryDesaturatedHover};
  }
`;

const Select = ({
  children,
  className,
  style,
  id,
  ...props
}) => (
  <SelectWrapper className={className} style={style}>
    <StyledSelect {...props}>
      {children}
    </StyledSelect>
  </SelectWrapper>
);

Select.propTypes = {
  children: React.PropTypes.node,
  className: React.PropTypes.string,
  id: React.PropTypes.string,
  style: React.PropTypes.string
};

export default Baseline(
  Select
);
