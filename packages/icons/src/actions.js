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
        width="4"
        height="16"
        viewBox="0 0 4 16"
        style={{ ...style, ...rotateStyle }}
        {...rest}
      >
        <path
          fill={calcFill({ fill, disabled, light, colors })}
          d="M2,16a2,2,0,1,0-2-2A2,2,0,0,0,2,16Zm0-6A2,2,0,1,0,0,8,2,2,0,0,0,2,10ZM2,4A2,2,0,1,0,0,2,2,2,0,0,0,2,4Z"
        />
      </svg>
    )}
  </Rotate>
);
