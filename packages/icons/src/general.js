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
        width="20"
        height="20"
        viewBox="0 0 20 20"
        style={{ ...style, ...rotateStyle }}
        {...rest}
      >
        <path
          fill={calcFill({ fill, disabled, light, colors })}
          d="M18,17a1,1,0,0,1-1,1H3a1,1,0,0,1-1-1V3A1,1,0,0,1,3,2H17a1,1,0,0,1,1,1ZM17,0H3A3,3,0,0,0,0,3V17a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V3A3,3,0,0,0,17,0ZM10,15a5,5,0,1,1,5-5A5,5,0,0,1,10,15ZM10,4a6,6,0,1,0,6,6A6,6,0,0,0,10,4ZM9,10a1,1,0,1,0,1-1A1,1,0,0,0,9,10Z"
        />
      </svg>
    )}
  </Rotate>
);
