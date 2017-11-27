import React from 'react';
import Colors from './colors';

export default ({ light = false, disabled = false, ...rest }) => (
  <Colors white secondary grey>
    {({ white, secondary, grey }) => (
      <svg
        width="12"
        height="17"
        viewBox="0 0 12 17"
        xmlns="http://www.w3.org/2000/svg"
        {...rest}
      >
        <path
          fill={disabled ? grey : light ? white : secondary}
          d="M4 0v1H0v2h12V1H8.001V0H4zM1 17h10V4H1v13z"
          fillRule="evenodd"
        />
      </svg>
    )}
  </Colors>
);
