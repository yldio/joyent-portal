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
        viewBox="0 0 12 16"
        width="12"
        height="16"
        style={{ ...style, ...rotateStyle }}
        {...rest}
      >
        <path
          fill={calcFill({ fill, disabled, light, colors })}
          d="M10,6V4A4,4,0,0,0,2,4V6H2A2,2,0,0,0,0,8v6a2,2,0,0,0,2,2h8a2,2,0,0,0,2-2V8A2,2,0,0,0,10,6ZM4,4c0-1.65.35-2,2-2s2,.35,2,2V6H4Zm6,9a1,1,0,0,1-1,1H3a1,1,0,0,1-1-1V9A1,1,0,0,1,3,8H9a1,1,0,0,1,1,1ZM6,13H6a1,1,0,0,1-1-1V10A1,1,0,0,1,6,9H6a1,1,0,0,1,1,1v2A1,1,0,0,1,6,13Z"
        />
      </svg>
    )}
  </Rotate>
);
