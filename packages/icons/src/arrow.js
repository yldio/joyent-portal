import React from 'react';
import Colors from './colors';

export default ({ light = false, ...rest }) => (
  <Colors white secondary>
    {({ white, secondary }) => (
      <svg
        width="9"
        height="6"
        viewBox="0 0 9 6"
        xmlns="http://www.w3.org/2000/svg"
        {...rest}
      >
        <path
          fill={light ? white : secondary}
          fillRule="evenodd"
          d="M9 1.386L7.648 0 4.5 3.228 1.352 0 0 1.386 4.5 6z"
        />
      </svg>
    )}
  </Colors>
);
