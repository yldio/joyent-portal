import BaseInput, { Stylable } from './base/input';
import Baseline from '../baseline';
import React from 'react';

const Input = Baseline(BaseInput(Stylable('input')));

/**
 * @example ./usage-input.md
 */
export default ({ children, ...rest }) =>
  <Input {...rest}>
    {children}
  </Input>;
