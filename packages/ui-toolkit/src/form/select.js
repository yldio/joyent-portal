import Baseline from '../baseline';
import BaseInput, { Stylable } from './base/input';
import React from 'react';

const Select = Baseline(BaseInput(Stylable('select')));

/**
 * @example ./usage-select.md
 */
export default ({ children, ...rest }) =>
  <Select {...rest}>
    {children}
  </Select>;
