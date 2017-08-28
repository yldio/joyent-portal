import BaseInput from './base/input';
import BaseToggle from './base/toggle';
import Baseline from '../baseline';
import React from 'react';

const Checkbox = Baseline(
  BaseInput(
    BaseToggle({
      type: 'checkbox'
    })
  )
);

/**
 * @example ./usage-checkbox.md
 */
export default ({ children, ...rest }) => (
  <Checkbox {...rest}>{children}</Checkbox>
);
