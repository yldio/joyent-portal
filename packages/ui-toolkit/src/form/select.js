import React from 'react';
import styled from 'styled-components';
import { isNot } from 'styled-is';
import remcalc from 'remcalc';

import Baseline from '../baseline';
import BaseInput, { Stylable } from './base/input';

const Select = Baseline(BaseInput(Stylable('select')));

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
    background: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOSIgaGVpZ2h0PSI2IiB2aWV3Qm94PSIwIDAgOSA2IiB4bWxucz0iaHR0cDo
vL3d3dy53My5vcmcvMjAwMC9zdmciPjx0aXRsZT5hcnJvdzogcmlnaHQ8L3RpdGxlPjxwYXRoIG
Q9Ik05IDEuMzg2TDcuNjQ4IDAgNC41IDMuMjI4IDEuMzUyIDAgMCAxLjM4NiA0LjUgNnoiIGZpb
Gw9IiM0OTQ5NDkiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPjwvc3ZnPg==')
      center center no-repeat;
    display: block;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: ${remcalc(12)};
  }
`;

/**
 * @example ./usage-select.md
 */
export default ({ children, fluid, ...rest }) => (
  <SelectWrapper fluid={fluid}>
    <Select {...rest}>{children}</Select>
  </SelectWrapper>
);
