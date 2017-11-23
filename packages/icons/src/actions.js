import React from 'react';
import remcalc from 'remcalc';

import Colors from './colors';

export default ({ light = false, ...rest }) => (
  <Colors white secondary>
    {({ white, secondary }) => (
      <svg width="4" height="16" viewBox="0 0 4 16" xmlns="http://www.w3.org/2000/svg" {...rest}>
        <path fill={light ? white : secondary} fill-rule="evenodd" d="M2 4a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
        <path fill={light ? white : secondary} style={{ transform: `translateY(${remcalc(6)})` }} fill-rule="evenodd" d="M2 4a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
        <path fill={light ? white : secondary} style={{ transform: `translateY(${remcalc(12)})` }} fill-rule="evenodd" d="M2 4a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
      </svg>
    )}
  </Colors>
);
