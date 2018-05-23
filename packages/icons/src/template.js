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
        height="18"
        viewBox="0 0 18 18"
        style={{ ...style, ...rotateStyle }}
        {...rest}
      >
        <path
          fill={calcFill({ fill, disabled, light, colors })}
          d="M16,0H2A2,2,0,0,0,0,2V16a2,2,0,0,0,2,2H16a2,2,0,0,0,2-2V2A2,2,0,0,0,16,0Zm0,2V8H8V2ZM2,2H7V16H2ZM8,16V9h8v7Z"
        />
      </svg>
    )}
  </Rotate>
);
