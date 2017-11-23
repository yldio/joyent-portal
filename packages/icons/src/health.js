import React from 'react';
import Colors from './colors';

export default ({ healthy = true, ...rest }) => (
  <Colors green orange>
    {({ green, orange }) => (
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        xmlns="http://www.w3.org/2000/svg"
        {...rest}
      >
        <g fill-rule="evenodd">
          <circle fill={healthy ? green : orange} cx="9" cy="9" r="9" />
          <path
            fill="#FFF"
            d="M9.477 6.603l-.522.443-.444-.443a2.056 2.056 0 1 0-2.908 2.909l3.352 3.352 3.412-3.352c.803-.804.863-2.106.06-2.91a2.105 2.105 0 0 0-2.95 0z"
          />
        </g>
      </svg>
    )}
  </Colors>
);
