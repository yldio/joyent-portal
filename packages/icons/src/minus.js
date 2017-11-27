import React from 'react';
import Colors from './colors';

export default ({ light = false, disabled = false, ...rest }) => (
  <Colors white secondary grey>
    {({ white, secondary, grey }) => (
      <svg
        width="8"
        height="2"
        viewBox="0 0 8 2"
        xmlns="http://www.w3.org/2000/svg"
        {...rest}
      >
        <path
          fill={disabled ? grey : light ? white : secondary}
          d="M0 0h8v2H0z"
          fillRule="evenodd"
        />
      </svg>
    )}
  </Colors>
);
