import React from 'react';

import BaseInput, { Stylable } from './base/input';
import Baseline from '../baseline';

const Input = Baseline(BaseInput(Stylable('input')));

/**
 * @example ./usage-input.md
 */
export default ({ children, ...rest }) => <Input {...rest}>{children}</Input>;
