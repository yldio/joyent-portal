import React from 'react';
import styled from 'styled-components';
import is, { isNot } from 'styled-is';
import remcalc from 'remcalc';
import PropTypes from 'prop-types';

import Baseline from '../baseline';
import BaseInput, { Stylable } from './base/input';

const chevron =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOSIgaGVpZ2h0PSI2IiB2aWV3Qm94PSIwIDAgOSA2IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjx0aXRsZT5hcnJvdzogcmlnaHQ8L3RpdGxlPjxwYXRoIGQ9Ik05IDEuMzg2TDcuNjQ4IDAgNC41IDMuMjI4IDEuMzUyIDAgMCAxLjM4NiA0LjUgNnoiIGZpbGw9IiM0OTQ5NDkiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPjwvc3ZnPg==';

const chevronDisabled =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOSIgaGVpZ2h0PSI2IiB2aWV3Qm94PSIwIDAgOSA2IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjx0aXRsZT5hcnJvdzogcmlnaHQ8L3RpdGxlPjxwYXRoIGQ9Ik05IDEuMzg2TDcuNjQ4IDAgNC41IDMuMjI4IDEuMzUyIDAgMCAxLjM4NiA0LjUgNnoiIGZpbGw9IiNEOEQ4RDgiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPjwvc3ZnPg==';

const SelectWrapper = styled.div`
  position: relative;
  display: inline-flex;

  ${isNot('fluid')`
    min-width: ${remcalc(200)};
  `};

  &:after {
    content: '';
    width: ${remcalc(10)};
    height: ${remcalc(10)};
    background: url(${chevron}) center center no-repeat;
    display: block;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: ${remcalc(12)};
  }

  ${is('disabled')`
    &:after {
      background: url(${chevronDisabled}) center center no-repeat;
    }
  `};
`;

const select = Baseline(BaseInput(Stylable('select')));
const StyledSelect = select.extend`
  position: relative;
  padding: ${remcalc(12)};
  padding-right: ${remcalc(25)};
  
  ${is('disabled')`
    border-color:  ${props => props.theme.grey};
    color:  ${props => props.theme.grey};
  `};

  ${is('wrapped')`
    margin: 0;
    border: none;
    width: ${remcalc(65)};
    border-left: ${remcalc(1)} solid ${props => props.theme.grey};
    border-radius: 0 ${remcalc(4)} ${remcalc(4)} 0;

    &:focus {
      border-left: ${remcalc(1)} solid ${props => props.theme.grey};
    }
  `};
`;

/**
 * @example ./usage-select.md
 */
const Select = ({ children, fluid, ...rest }) => (
  <SelectWrapper fluid={fluid}>
    <StyledSelect {...rest} fluid={fluid}>
      {children}
    </StyledSelect>
  </SelectWrapper>
);

export default Select;

Select.propTypes = {
  /**
   * Is the Select disabled ?
   */
  disabled: PropTypes.bool
};

Select.defaultProps = {
  disabled: false
};
