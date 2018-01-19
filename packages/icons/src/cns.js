import React from 'react';

import Rotate from './rotate';
import calcFill from './fill';

export default ({
  fill = null,
  light = false,
  disabled = false,
  direction = 'down',
  colors = {},
  style = {},
  ...rest
}) => (
  <Rotate direction={direction}>
    {({ style: rotateStyle }) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="14"
        viewBox="0 0 18 14"
        style={{ ...style, ...rotateStyle }}
        {...rest}
      >
        <path
          fill={calcFill({ fill, disabled, light, colors })}
          d="M16,2V5H2V2H16m1-2H1A1,1,0,0,0,0,1V6A1,1,0,0,0,1,7H17a1,1,0,0,0,1-1V1a1,1,0,0,0-1-1Z"
        />
        <polygon points="4.74 11.44 4.11 12.07 4.11 9 3.11 9 3.11 12.1 2.45 11.44 1.74 12.15 3.6 14 5.45 12.15 4.74 11.44" />
        <polygon points="10.26 11.44 9.63 12.07 9.63 9 8.63 9 8.63 12.1 7.96 11.44 7.26 12.15 9.11 14 10.96 12.15 10.26 11.44" />
        <polygon points="15.74 11.44 15.11 12.07 15.11 9 14.11 9 14.11 12.1 13.45 11.44 12.74 12.14 14.6 14 16.45 12.14 15.74 11.44" />
      </svg>
    )}
  </Rotate>
);
