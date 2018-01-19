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
        width="13.36"
        height="14"
        viewBox="0 0 13.36 14"
        style={{ ...style, ...rotateStyle }}
        {...rest}
      >
        <path
          fill={calcFill({ fill, disabled, light, colors })}
          d="M2.53,1.68a.81.81,0,0,1,.39.1l8.31,4.48a.84.84,0,0,1,0,1.48L2.92,12.22a.81.81,0,0,1-.39.1.85.85,0,0,1-.85-.85V2.53a.85.85,0,0,1,.85-.85M2.53,0A2.53,2.53,0,0,0,0,2.53v8.94A2.53,2.53,0,0,0,3.72,13.7L12,9.22a2.52,2.52,0,0,0,0-4.44L3.72.3A2.5,2.5,0,0,0,2.53,0Z"
        />
      </svg>
    )}
  </Rotate>
);
