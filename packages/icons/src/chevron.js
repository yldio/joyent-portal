import React from 'react';
import Colors from './colors';

export default ({ light = false, ...rest }) => (
  <Colors white secondary>
    {({ white, secondary }) => (
      <svg
        width="6"
        height="10"
        viewBox="0 0 6 10"
        xmlns="http://www.w3.org/2000/svg"
        {...rest}
      >
        <path
          fill={light ? white : secondary}
          fillRule="evenodd"
          d="M1.12 0L0 1.36 3.496 4.8 0 8.24 1.12 9.6 6 4.8 1.12 0z"
          opacity=".5"
        />
      </svg>
    )}
  </Colors>
);
