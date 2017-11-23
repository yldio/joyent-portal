import React from 'react';
import Colors from './colors';

export default ({ light = false, ...rest }) => (
  <Colors white secondary>
    {({ white, secondary }) => (
      <svg
        width="8"
        height="8"
        viewBox="0 0 8 8"
        xmlns="http://www.w3.org/2000/svg"
        {...rest}
      >
        <path
          fill={light ? white : secondary}
          d="M3 3H0v2h3v3h2V5h3V3H5V0H3v3z"
          fillRule="evenodd"
        />
      </svg>
    )}
  </Colors>
);
